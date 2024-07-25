title: Time in Operating Systems
date: 2024-08-25
tags: [CS, Operating Systems]
excerpt: Implementation of Time in different Operating systems, concept of Wall Time and Monotonic Time

----------------------------------------------------------------------------------------------------------------

Time is a linear monotonically increasing value and to keep track of it, a system has to be powered to take note of every tick. For an microcomputer running an operating system that can go on and off, this means there is a need to constantly update time whenever the computer comes on, but that is not the case because of some intelligent mechanisms that operating systems use to keep track of the current time.

## The CMOS RAM

Since time is always increasing, and a system has to be powered to stay updated, operating systems and manufacturers provide a system called CMOS (complementary metal–oxide–semiconductor) RAM, which is part of the motherboard. The CMOS is powered by a tiny 3v battery usually a  CR2032 3V lithium cell which helps it to constantly stay on.

![CMOS Battery](/static/cmos-battery.jpeg)

CMOS RAM has two jobs:
- Remember the date and time of your system 
- Remember a system's Master Boot Path - from where the system starts booting.

## Time Implementation in Operating Systems
Operating systems have different methods they use to define time. 
### Windows
In windows operating system, 
### Unix

## The Wall Clock and the Monotonic Clock
Although computer architecture provide a way to determine the current time using the CMOS, 

### Implementation in Unix

### Implementation in Windows

## Programming Languages and Time