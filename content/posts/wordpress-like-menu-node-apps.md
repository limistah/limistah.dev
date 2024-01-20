---
title: Menu system in Node Apps like WordPress Menu
date: 2020-01-25
tags: []
---

You might have been in this kind of trap before or currently in one, well, I just want to tell you that I know your pain.

In a custom built CMS, managing of Menu and navigation in the site from the Admin Dashboard is a requirement. While it is interesting to use, it is not as interesting to build.

I just walked past this process, here, I am sharing how I have conquered it.

### To consider

I have a limitation for the menu to be deeply nested not more than two steps, so in this case, this is to ensure that the loops that I will write won't have to be too recursive -  which if not properly handled could create havoc.

## Model/Database

In my database, I have the menu store as a flat document with each of them having their own information. The menu model has the following properties:

- **position:** Position of the menu (Determined by the application, in my case, "Main Nav", and "Footer Menu")
- **name:**Text that the user would see
- **parent:** String containing the index of the parent or index of the grand parent with the index of the parent separated by a dot in the case of nesting
- **url:** The URL to map the navigation to
- **weight** The sorting order for the menu.

So, with the above fields, I can create a menu like this:

```js
const mainMenu = [
  {
    name: "Home",
    url: "/",
    position: "Main Nav",
    parent: null,
    weight: 1
  },
  {
    name: "Listings",
    url: "/listings",
    position: "Main Nav",
    parent: null,
    weight: 2
  },
  {
    name: "Categories",
    url: "/categories",
    position: "Main Nav",
    parent: null,
    weight: 3
  },
  {
    name: "Pricing",
    url: "/pricing",
    position: "Main Nav",
    parent: null,
    weight: 4
  },

  {
    name: "Pages",
    url: "#",
    position: "Main Nav",
    parent: null,
    weight: 5
  },
  {
    name: "About",
    url: "#",
    position: "Main Nav",
    parent: 5,
    weight: 1
  },
  {
    name: "Contact",
    url: "/contact",
    position: "Main Nav",
    parent: "5.1",
    weight: 1
  }
].map(async menu => {
  const mainMenu = new Menu();
  Object.assign(mainMenu, menu); // Populates the fields to the mainMenu object
  await mainMenu.save(); // Saves the menu
});

```

First problem has been solved.

Next problem is making the data of the menu available in a format that we can render more easily.

### Menu parser middleware

To solve this, I created a middleware which sets a global value for my view engine. The code in the middleware looks like this:

```js
async handle({ request, view }, next) {
  // call next to advance the request

  // Can be MongoDB Model, this is AdonisJS
  const MenuService = use("App/Services/Admin/MenuService");
  const menuService = new MenuService();

  const menus = await menuService.findAll("position");

  // Parsing of the menu comes in here

  // At this point built menu contains keys of menu positions, the value of every keys is an array of nested values that can be passed to drag and drop UI libraries like JQuery nestable for admin configuration using a browser.

  // Adonis code to share values across all views.
  view.share({ siteMenus: builtMenu });
}
```

### Parsing of Zero Level menus and sorting

After the middleware has been defined, first is to understand that our menu won't go more than two levels, with the zero level being the parent to other menus. To get the parent out of the menu, we map through all the items in the `menus` variable, getting all the elements that has just no dot in their parent value then storing them at a position defined in the `builtMenu` object

```js
const builtMenu = {};
const menuWithParent = []; // Stores all menu that has parent for later processing
// First of all, gather all the menus with same position to the same index
menus.map(menu => {
  // The position for the current menu does not exist in the builtMenu object 
  if (!builtMenu[menu.position]) {
    // Create it with an empty array
    builtMenu[menu.position] = [];
  }
  // If this menu does not have parent, push it directly into its position key in the builtMenu variable
  if (!menu.parent) {
    builtMenu[menu.position].push(menu);
  } else {
    // Else, push for later processing
    menuWithParent.push(menu);
  }
});
```

Before we move forward, we should add code that sorts the generated menu so far, the easiest way is to get the keys in the built menu and map through each keys, then running the `sort` aggregation method on each item of the `builtMenu` data.

This sorting only compares the weight of each menu item, these weights are expected to go in ascending order, hence we can use `a.weight > b.weight` so that we can have lowest number comes first ahead of larger number

```js
const sortedMenu = {}; // Holds all the menu that has been sorted
// Sorts all the menu in their respective positions, just to maintain ordering
Object.keys(builtMenu).map(positionKey => {
  const menuAtPosition = builtMenu[positionKey];
  sortedMenu[positionKey] = menuAtPosition.sort(
    (a, b) => a.weight > b.weight
  );
});
```

At this stage, our `builtMenu` should look like this:
```json
{
  "Main Menu": [
    {
      ...menu // <- Menu details
    },
    {
      ...menu // <- Menu details
    },
    {
      ...menu // <- Menu details
    },
    {
      ...menu // <- Menu details
    },
    { 
      ...menu, // <- Menu details
    }
  ]
}

```

What we have to do next is work with the menus that exist in the `menuWithParent` variable that was gathered while pulling the menus that do not have child/grandchild.

### Parsing of First Level menus and sorting

To do this, we map through all the item in the variable, ensure that it does not have grandparent, if it does we push it to the `menuWithGrandParent` array for later processing, if it does not, we append the menu to the parent after creating a children array in to the parent if children array does not exist in the parent.

We also sort the menu generated so far after pushing to the parent, to maintain ordering of the menu.

```js
// This variable holds the menus that has grandparent
const menuWithGrandParent = [];

// We want to work on the menu that has parent
menuWithParent.map(menu => {
  // following the structure of our menu in the database, parentIndex is the value of the parent key of every menu that has parent
  let parentIndex = menu.parent;
  // We still have to determine if the menu is a grandchild of a parent, so we split by the dot separator that we have used then use the length of the array as a determinant
  const hasGrandChild = parentIndex.split(".").length > 1;
  // This menu is not a grandchild, we can proceed with our process
  if (!hasGrandChild) {
    // We need to get the position of the menu
    const menusAtPosition = builtMenu[menu.position];
    parentIndex = parseInt(parentIndex);
    // Decrements the parentIndex to get the index in the array, in any case the reducing by 1 is lesser than zero, we want to default to index 0 else we want to get the index in the array 
    const parent =
      menusAtPosition[parentIndex - 1 < 0 ? 0 : parentIndex - 1];
    // If the parent does not have children, we to initialize that to an array
    if (!parent.children) {
      parent.children = [];
    }
    // Push the new child of the parent into its children
    parent.children.push(menu);
    // Sort the children in the parent to maintain ordering
    parent.children.sort((a, b) => a.weight > b.weight);
  } else {
    // This menu has a grandparent, we can not process it like this, we push to the menuWithGrandParent array and process after this
    menuWithGrandParent.push(menu);
  }
});
```

And our `builtMenu` should now look like this:


At this stage, our `builtMenu` should look like this:
```json
{
  "Main Menu": [
    {
      ...menu // <- Menu details
    },
    {
      ...menu // <- Menu details
    },
    {
      ...menu // <- Menu details
    },
    {
      ...menu // <- Menu details
    },
    { // Parent Menu
      ...menu, // <- Menu details
      children: [
        {  // Child Menu
          ...menu, // <- Menu details
        },
      ]
    }
  ]
}
```

### Parsing of Second Level menus and sorting

Now that we have the parent and children out, we are left with just one level deep, which is for the grandchild. The code is similar to the one that generate the children menus just that we have to get the index for the parent, grandparent and ensure that they have children or we create one for them before we can append the new array into them.

```js
// Processes menu that has grandparent
menuWithGrandParent.map(menu => {
  // Get the parent of the parent
  let menuParent = menu.parent;
  // Split the parent to get the index of the parent and grand parent
  const indexSplit = menuParent.split(".");
  // Get the position of this menu
  const grandChildMenuPosition = builtMenu[menu.position];
  // Get the index of the grand parent
  const grandParentIndex = indexSplit[0] - 1 < 0 ? 0 : indexSplit[0] - 1;
  // Set the index of the parent
  const parentIndex = indexSplit[1] - 1 < 0 ? 0 : indexSplit[1] - 1;
  // The menus at the position of the grand child menu using the grand parent index 
  const grandParentMenu = grandChildMenuPosition[grandParentIndex];
  // If this grand parent has children, which we expect that it should
  if (grandParentMenu.children) {
    // We get the parent of the menu from the grandparent's children
    const parent = grandParentMenu.children[parentIndex];
    // if the parent exists
    if (parent) {
      // Initialize children on the parent if it has none
      if (!parent.children) {
        parent.children = [];
      }
      // Push the menu to the parent under the grand parent
      parent.children.push(menu);
      // SOrt the children of the parent of the grandchild to maintain the ordering
      parent.children.sort((a, b) => a.weight > b.weight);
    }

  }
});
```

Finally, our `builtMenu` should look like this:
```json
{
  "Main Menu": [
    {
      ...menu // <- Menu details
    },
    {
      ...menu // <- Menu details
    },
    {
      ...menu // <- Menu details
    },
    {
      ...menu // <- Menu details
    },
    { // Grand Parent Menu
      ...menu, // <- Menu details
      children: [
        {  // Parent Menu
          ...menu, // <- Menu details
          ...menu, // <- Menu details
          children: [
            {  // Child Menu
              ...menu, // <- Menu details
            },
          ]
        },
      ]
    }
  ]
}
```
### Putting it all together

Compiling all together, the middleware looks like:
```js
async handle({ request, view }, next) {
  // call next to advance the request

  // Can be MongoDB Model, this is AdonisJS
  const MenuService = use("App/Services/Admin/MenuService");
  const menuService = new MenuService();

  const menus = await menuService.findAll("position");

  const builtMenu = {};
  const menuWithParent = []; // Stores all menu that has parent for later processing
  // First of all, gather all the menus with same position to the same index
  menus.map(menu => {
    // The position for the current menu does not exist in the builtMenu object 
    if (!builtMenu[menu.position]) {
      // Create it with an empty array
      builtMenu[menu.position] = [];
    }
    // If this menu does not have parent, push it directly into its position key in the builtMenu variable
    if (!menu.parent) {
      builtMenu[menu.position].push(menu);
    } else {
      // Else, push for later processing
      menuWithParent.push(menu);
    }
  });

  const sortedMenu = {}; // Holds all the menu that has been sorted
  // Sorts all the menu in their respective positions, just to maintain ordering
  Object.keys(builtMenu).map(positionKey => {
    const menuAtPosition = builtMenu[positionKey];
    sortedMenu[positionKey] = menuAtPosition.sort(
      (a, b) => a.weight > b.weight
    );
  });


  // This variable holds the menus that has grandparent
  const menuWithGrandParent = [];

  // We want to work on the menu that has parent
  menuWithParent.map(menu => {
    // following the structure of our menu in the database, parentIndex is the value of the parent key of every menu that has parent
    let parentIndex = menu.parent;
    // We still have to determine if the menu is a grandchild of a parent, so we split by the dot separator that we have used then use the length of the array as a determinant
    const hasGrandChild = parentIndex.split(".").length > 1;
    // This menu is not a grandchild, we can proceed with our process
    if (!hasGrandChild) {
      // We need to get the position of the menu
      const menusAtPosition = builtMenu[menu.position];
      parentIndex = parseInt(parentIndex);
      // Decrements the parentIndex to get the index in the array, in any case the reducing by 1 is lesser than zero, we want to default to index 0 else we want to get the index in the array 
      const parent =
        menusAtPosition[parentIndex - 1 < 0 ? 0 : parentIndex - 1];
      // If the parent does not have children, we to initialize that to an array
      if (!parent.children) {
        parent.children = [];
      }
      // Push the new child of the parent into its children
      parent.children.push(menu);
      // Sort the children in the parent to maintain ordering
      parent.children.sort((a, b) => a.weight > b.weight);
    } else {
      // This menu has a grandparent, we can not process it like this, we push to the menuWithGrandParent array and process after this
      menuWithGrandParent.push(menu);
    }
  });

  // Processes menu that has grandparent
  menuWithGrandParent.map(menu => {
    // Get the parent of the parent
    let menuParent = menu.parent;
    // Split the parent to get the index of the parent and grand parent
    const indexSplit = menuParent.split(".");
    // Get the position of this menu
    const grandChildMenuPosition = builtMenu[menu.position];
    // Get the index of the grand parent
    const grandParentIndex = indexSplit[0] - 1 < 0 ? 0 : indexSplit[0] - 1;
    // Set the index of the parent
    const parentIndex = indexSplit[1] - 1 < 0 ? 0 : indexSplit[1] - 1;
    // The menus at the position of the grand child menu using the grand parent index 
    const grandParentMenu = grandChildMenuPosition[grandParentIndex];
    // If this grand parent has children, which we expect that it should
    if (grandParentMenu.children) {
      // We get the parent of the menu from the grandparent's children
      const parent = grandParentMenu.children[parentIndex];
      // if the parent exists
      if (parent) {
        // Initialize children on the parent if it has none
        if (!parent.children) {
          parent.children = [];
        }
        // Push the menu to the parent under the grand parent
        parent.children.push(menu);
        // SOrt the children of the parent of the grandchild to maintain the ordering
        parent.children.sort((a, b) => a.weight > b.weight);
      }

    }
  });


  // At this point built menu contains keys of menu positions, the value of every keys is an array of nested values that can be passed to drag and drop UI libraries like JQuery nestable for admin configuration using a browser.

  // Adonis code to share values across all views.
  view.share({ siteMenus: builtMenu });
}
```

### Consuming the menu data from frontend

The easiest way to consume the menu is to use a JQuery plugin called [nestable++](https://github.com/FrancescoBorzi/Nestable/), the plugin make updating, creating and storing of the menu easier with the data that we have.

It expects an ordered list to be populated with list items and if children is expected, the list items should contain another unordered list with the children as the list items.

In our own case, once the view has set a JavaScript object with the menu data as its value, we can do something like this:

```js
let CURRENT_MENU = "Main Menu";
$(function() {
  function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }

  const siteMenus = JSON.parse(decodeHtml(window._siteMenus));
  // This initializes the drag and drop nestable listing
  nestableMenuBuilder(siteMenus[CURRENT_MENU], { maxDepth: 3 });
});
```

The `nestableMenuBuilder` function looks like this:
```js

const nestableMenuBuilder = function(menuList, options = {}) {
  // Creates a single menu item that the nestable understands
  const menuItem = function(item) {
    return $(`
  <li class="dd-item" data-id="${item.id}" data-name="${
      item.name
    }" data-slug="${item.url}" data-new="${item.new || 0}" data-deleted="0">
  <div class="dd-handle">${item.name}</div>
            <span class="button-delete btn btn-default btn-xs pull-right"
            data-owner-id="${item.id}">
              <i class="nestable-icon" data-feather="x" ></i>
              </span>
              <span class="button-edit btn btn-default btn-xs pull-right"
            data-owner-id="${item.id}">
            <i class="nestable-icon" data-feather="edit-3"></i>
              </span>
              </li>`);
  };

  const buildNestable = function(items) {
    const $parent = $('<ol class="dd-list"></ul>');
    const createChildren = function(items, $_parent) {
      return items.map(item => {
        const $_el = menuItem(item);
        if (item.children) {
          const $_parent = $('<ol class="dd-list"></ul>');
          createChildren(item.children, $_parent);
          $_el.append($_parent);
        }
        $_parent.append($_el);
      });
    };

    items.map(item => {
      const $_el = menuItem(item);
      if (item.children) {
        const $_parent = $('<ol class="dd-list"></ul>');
        createChildren(item.children, $_parent);
        $_el.append($_parent);
      }
      $parent.append($_el);
    });
    return $parent;
  };

  const nestableList = buildNestable(menuList);


  // Initializes nestable++
  $(".dd.nestable")
    .empty()
    .append(nestableList);
};

```

In our html, we have to include the nestable++ plugin from [here](https://github.com/FrancescoBorzi/Nestable/blob/master/jquery.nestable.js) and its css from [here](https://github.com/FrancescoBorzi/Nestable/blob/master/style.css) and [JQuery](https://code.jquery.com/jquery-3.4.1.min.js), then create an `ol` with class names `dd nestable`.

```html
<ol class="dd nestable"></ol>
```

And, that is it.

### Conclusion

There are other features of nestable that I do not include here, like updating, adding new item and deleting a menu item. I feel those are for nestable++ itself, including them here would take us out of scope for the post.

