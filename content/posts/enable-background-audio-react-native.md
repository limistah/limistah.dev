---
title: How to enable background Audio Play in iOS React Native
date: 2021-05-27
tags: [react-native, mobile]
category: react-native
excerpt: Enable background play when a React Native App is minimized
---

1. Open `ios/{APP_NAME}/Info.plist`.

2. Add

```xml
<plist>
<dict>
  ...
  ...
  ...
  <key>UIBackgroundModes</key>
	<array>
		<string>audio</string>
	</array>
</dict>
</plist>
```

3. Press `r` on the metro terminal

_Voila!_
