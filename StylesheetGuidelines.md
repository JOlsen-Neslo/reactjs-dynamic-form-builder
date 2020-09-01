# Stylesheet Guidelines
1. [Configuration Structure](#configuration-structure)

## Configuration Structure

This application follows ITCSS guidelines for structuring stylesheet config in an application (https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/).

Stylesheet configuration is necessary if we want to build a scalable app that shares presentational properties across the application (e.g. colours, measurements, etc.).

The basic principle of ITCSS is separating out different areas of concern, and arranging/loading them into the page from **least specific** reach to **most specific** reach.

In our app, we have the following setup under the stylesheets folder. These folders are prefixed with numbers, indicating their load order (from lowest specificity, to most specificity).

#### **00_settings**

This is the least specific area, meaning its contents are used almost everywhere. Containing colours, base units, fonts and fundamental utility functions.

#### **01_tools**

Utilities that cover common operations or properties (in the form of _mixins_ or _functions_) are placed here. More specific than basic configuration, but still abstract enough to be used anywhere.

#### **02_generic**

Generic styling, e.g. base html resets are located in this folder. This is the first area that actually outputs any actual css properties that are applied directly onto the DOM. We are setting base font sizes here, as well as default appearances of html elements like headers or inputs.

#### **03_elements**

Meant to contain direct styling of html elements. We use this area for defining and apply font styles onto typographical elements.

#### **04_utilities**

We store any utility classes here, e.g. stand alone classes that control visiblity.

#### **05_overrides**

The most specific level of configuration - here is where we would keep really targetted styles, that don't belong in component stylesheets, e.g. overriding styling of elements _on a specific page_
