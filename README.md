# Vend Extend

A simple extension which offered some customization for Vend POS on desktop devices. This extension was built for a charity, so a lot of the features were focused on stripping down the interface to make it look cleaner, and improving usability or sales processing time. For example, a charity may not need promo codes or separately applied discounts, or each item may be individually priced as they are processed (a charity may sell only donated goods which vary in uniqueness and quality so must be priced accordingly).

Each option can be enabled or disabled separately based on preference.

##### Features

  - focus or highlight values in inputs such as price or quantity if they need to be changed, the value does not need to be deleted manually
  - open new line items to change price (or quantity) automatically
  - hide common elements that don't need to be displayed
  - scheduled cache deletion to avoid known caching issues e.g. https://support.vendhq.com/hc/en-us/articles/360001359335-Vend-not-Loading-Showing-White-Screen-on-Computer

##### Required Permissions
  - storage - used to store default settings and save user preferences
  - browsingData - used to clear Vend cache data 
  - webRequest - used to listen for Vend initiated web requests
  - "https://*.vendhq.com/webregister" - used to gain host permissions for Vend
