---
title: Time in Computer Systems
date: 2024-07-25
tags: [CS, Microcomputers]
excerpt: Learn how time tracking is implemented from the hardware.
description: Learn how time tracking is implemented from the hardware.
cover:
  image: "/assets/Dallas_Semiconductor_DS12B887-2377-Medium-620x465.jpg"
---

Time is a linear monotonically increasing value and to keep track of it, a system has to be powered to take note of every tick. For a microcomputer running an operating system that can go on and off, this means there is a need to constantly update time whenever the computer comes on, but that is not the case because of some intelligent mechanisms that computer hardware and operating systems use to keep track of the current time.

## Real-Time Clock

A [Real-Time Clock (RTC)](https://en.wikipedia.org/wiki/Real-time_clock) is an electronic hardware component that helps track the current time and date, even when the system is powered off.

### How it works

RTC uses an oscillator that generates a stable and precise frequency, typically 32.768 kHz. The pulses from the oscillator are sent to counters within the RTC chip where seconds, minutes, hours, days, and so on are measured. These counters increment to keep track of the current time and date. The values for the current date and time are stored in registers contained within the RTC chipset, these registers also help to keep track of configuration values such as alarms, enabling and disabling the clock, and adjusting for leap years.

RTC chips can be powered by a CMOS RAM battery but are mostly powered internally by an alternate power source, usually a replaceable lithium battery or modern [supercapacitors](https://en.wikipedia.org/wiki/Supercapacitor).

## Network Time Protocol

Although RTC can keep track of time using oscillators, there is no source of truth for what the current time might be. 

[NTP](https://en.wikipedia.org/wiki/Network_Time_Protocol) is a protocol designed to synchronize the clocks of computers over a network. It aims to keep the system time in sync with more accurate time sources, such as atomic clocks or GPS clocks. It implements the intersection algorithm and uses a client-server model to send time stamps which is accurate to 10 milliseconds over the public internet.

## RTC and NTP

As mentioned earlier, time is monotonically increasing, operating systems use a combination of RTP and NTP to maintain a consistent time that users see.

On Windows, support for NTP is inbuilt can be configured through the system settings or the command line, and is managed by Windows Time service. This service can be manually started with:

```powershell
net start w32time
```

On Linux, support for NTP is also built-in, but can be installed manually:

```bash
sudo apt-get install ntp       # Debian/Ubuntu
sudo yum install ntp           # CentOS/RHEL
sudo dnf install ntp           # Fedora
```

And can be started as a daemon afterwards:

```bash
sudo systemctl enable ntp
sudo systemctl start ntp
```

## RTC on mobile devices

For devices that do not have any networking support but can send and receive radio signals, there is a **Radio-based RTC** that mobile network providers use to send current time to mobile devices. This can explain why time is always correct on mobile devices even in remote areas without access to the internet.

## Wall Clock and Monotonic Clock

Computers rely on interrupts and signals to function properly like scheduling processes. Interrupts are implemented with timers that send signals at specific intervals.  With the time information provided by RTC, if the time is updated by NTP to an older or future time, this causes problems for the operating system to determine what processes to [interrupt](https://en.wikipedia.org/wiki/Interrupt) or resume.

To solve this problem, computers use a monotonically increasing counter called the Monotonic Clock. It provides a continuously increasing value that represents the total elapsed time since an unspecified starting point (often the boot time of the system). This introduces a second clock to the operating system, and brought about the name Monotonic Clock, while RTC is referred to as the Wall Clock.

Monotonic clocks are useful for:

- accurately measuring the elapsed time between events
- implementing timeouts and delays in applications where time needs to be measured consistently and without interruption
-  Ensuring reliable timing in distributed systems where synchronized actions are crucial.

Most programming languages provide access to both time:

### Python

```python
import time
print("Current time:", time.time())
print("Monotonic time:", time.monotonic())
```

### Ruby

```ruby
current_time = Time.now
puts "Current time: #{current_time}"
monotonic_time = Process.clock_gettime(Process::CLOCK_MONOTONIC)
puts "Monotonic time: #{monotonic_time}"
```

![image-20240726123100792](/assets/clock_time_ruby.png)

### JavaScript

```js
console.log("Current time: ", Date.now())
const monotonicTime = performance.now();
// milliseconds since page load:
console.log(`Monotonic time ${monotonicTime}`);
```

![image-20240726122516502](/assets/clock_time_nodejs.png)

### Go 

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	fmt.Println("Current time: ", time.Now())

	// Get the current monotonic time
	monotonicTime := time.Now().UnixNano()
	// nanoseconds since epoch
	fmt.Printf("Monotonic time: %d\n", monotonicTime)
}
```

https://go.dev/play/p/aPgf5HBzSG6

## C

```c
#include <time.h>
#include <stdio.h>

int main() {
    struct timespec ts;
    clock_gettime(CLOCK_REALTIME, &ts);
    printf("Current time: %ld.%ld\n", ts.tv_sec, ts.tv_nsec);
  
    struct timespec mts;
    clock_gettime(CLOCK_MONOTONIC, &mts);
    printf("Monotonic time: %ld.%ld\n", mts.tv_sec, mts.tv_nsec);
    return 0;
}

```

![image-20240726125536195](/assets/clock_time_c.png)

View on [Replit](https://replit.com/@AleemIsiaka/wallmonotonicclock)

### Conclusion

This post shared the concept of time in computer system architectures and drilled down to discuss more on the different types of time available within an operating system and examples of how they can be retrieved from different programming languages.

[au revoir!](https://translate.google.com/?sl=auto&tl=en&text=au%20revoir&op=translate)
