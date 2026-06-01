# Repositório de Seletores - Automation Exercise
**Versão:** 1.0.0<br>
**Metodologia:** POM (Page Object Model)<br>
**Responsável:** Rafael Barelli

---

## Estrutura por Pagina

### HomePage
| Elemento | Seletor Atual | Alternativa 1 | Alternativa 2 | Status/Historico |
|----------|---------------|---------------|---------------|------------------|
| Logo | `img[alt="Website for automation practice"]` | `.logo img` | `a[href="/"] img` | OK |
| SignupLoginLink | `a[href="/login"]` | `i.fa-lock` | `contains('Signup / Login')` | OK |
| DeleteAccountLink | `a[href="/delete_account"]` | `i.fa-trash-o` | `contains('Delete Account')` | OK |
| LogoutLink | `a[href="/logout"]` | `i.fa-lock` | `contains('Logout')` | OK |
| ContactUsLink | `a[href="/contact_us"]` | `i.fa-envelope` | `contains('Contact us')` | OK |
| TestCasesLink | `a[href="/test_cases"]` | `i.fa-list` | `contains('Test Cases')` | OK |
| ProductsLink | `a[href="/products"]` | `i.fa-card` | `contains('Products')` | OK |
| CartLink | `a[href="/view_cart"]` | `i.fa-shopping-cart` | `contains('Cart')` | OK |
| LoggedInIndicator | `li.contains('Logged in as')` | `ul.nav` | - | OK |
| SubscribeEmail | `#susbscribe_email` | `input[name="email"]` | - | OK |
| SubscribeButton | `#subscribe` | `button#subscribe` | - | OK |
| SubscribeSuccess | `#success-subscribe` | `.alert-success` | - | OK |
| SubscriptionWidget | `.single-widget` | `.footer-widget` | - | OK |
| SubscriptionHeader | `.single-widget h2` | `.single-widget .title` | - | OK |
| ScrollUpIcon | `i[class*="angle-up"]` | `a#scrollUp` | - | OK |

### LoginPage
| Elemento | Seletor Atual | Alternativa 1 | Alternativa 2 | Status/Historico |
|----------|---------------|---------------|---------------|------------------|
| NewUserHeader | `h2.contains('New User Signup!')` | `.signup-form h2` | - | OK |
| LoginHeader | `h2.contains('Login to your account')` | `.login-form h2` | - | OK |
| nameInput | `input[data-qa="signup-name"]` | `[placeholder="Name"]` | `input[name="name"]` | OK |
| SignupEmail | `input[data-qa="signup-email"]` | `form[action="/signup"] [placeholder="Email Address"]` | - | OK |
| SignupButton | `button[data-qa="signup-button"]` | `button.btn-default`.contains('Signup') | - | OK |
| LoginEmail | `input[data-qa="login-email"]` | `[placeholder="Email Address"]` | `input[name="email"]` | OK |
| LoginPassword | `input[data-qa="login-password"]` | `[placeholder="Password"]` | `input[name="password"]` | OK |
| LoginButton | `button[data-qa="login-button"]` | `button.btn-default`.contains('Login') | - | OK |

### SignupPage
| Elemento | Seletor Atual | Alternativa 1 | Alternativa 2 | Status/Historico |
|----------|---------------|---------------|---------------|------------------|
| AccountInfoHeader | `h2.contains('Enter Account Information')` | `.login-form h2 b` | - | OK |
| GenderMale | `#id_gender1` | `input[value="Mr"]` | - | OK |
| GenderFemale | `#id_gender2` | `input[value="Mrs"]` | - | OK |
| Password | `#password` | `input[name="password"]` | - | OK |
| Days | `#days` | `select[name="days"]` | - | OK |
| Months | `#months` | `select[name="months"]` | - | OK |
| Years | `#years` | `select[name="years"]` | - | OK |
| Newsletter | `#newsletter` | `input[name="newsletter"]` | - | OK |
| Optin | `#optin` | `input[name="optin"]` | - | OK |
| FirstName | `#first_name` | `input[name="first_name"]` | - | OK |
| LastName | `#last_name` | `input[name="last_name"]` | - | OK |
| Company | `#company` | `input[name="company"]` | - | OK |
| Address1 | `#address1` | `input[name="address1"]` | - | OK |
| Address2 | `#address2` | `input[name="address2"]` | - | OK |
| Country | `#country` | `select[name="country"]` | - | OK |
| State | `#state` | `input[name="state"]` | - | OK |
| City | `#city` | `input[name="city"]` | - | OK |
| Zipcode | `#zipcode` | `input[name="zipcode"]` | - | OK |
| MobileNumber | `#mobile_number` | `input[name="mobile_number"]` | - | OK |
| CreateAccountBtn | `button[data-qa="create-account"]` | `button`.contains('Create Account') | - | OK |

### AccountPage
| Elemento | Seletor Atual | Alternativa 1 | Alternativa 2 | Status/Historico |
|----------|---------------|---------------|---------------|------------------|
| CreatedHeader | `h2.contains('Account Created!')` | `b.contains('Account Created!')` | - | OK |
| DeletedHeader | `h2.contains('Account Deleted!')` | `b.contains('Account Deleted!')` | - | OK |
| ContinueBtn | `a[data-qa="continue-button"]` | `a.btn-primary` | `a.contains('Continue')` | OK |

### ContactUsPage
| Elemento | Seletor Atual | Alternativa 1 | Alternativa 2 | Status/Historico |
|----------|---------------|---------------|---------------|------------------|
| GetInTouchHeader | `h2.contains('Get In Touch')` | `.contact-form h2.title` | - | OK |
| Name | `input[data-qa="name"]` | `input[name="name"]` | - | OK |
| Email | `input[data-qa="email"]` | `input[name="email"]` | - | OK |
| Subject | `input[data-qa="subject"]` | `input[name="subject"]` | - | OK |
| Message | `textarea[data-qa="message"]` | `textarea[name="message"]` | - | OK |
| FileInput | `input[type="file"]` | `input[name="upload_file"]` | - | OK |
| SubmitBtn | `input[data-qa="submit-button"]` | `input[type="submit"]` | - | OK |
| HomeBtn | `a.btn-success[href="/"]` | `span.contains(' Home')` | - | OK |
| SuccessMsg | `.status.alert.alert-success` | `.contact-form .alert-success` | - | OK |

### TestCasesPage
| Elemento | Seletor Atual | Alternativa 1 | Alternativa 2 | Status/Historico |
|----------|---------------|---------------|---------------|------------------|
| PageTitle | `h2.contains('Test Cases')` | `b.contains('Test Cases')` | - | OK |


### ProductsPage
| Elemento | Seletor Atual | Alternativa 1 | Alternativa 2 | Status/Historico |
|----------|---------------|---------------|---------------|------------------|
| AllProductsHeader | `h2.contains('All Products')` | `.features_items h2.title` | - | OK |
| ProductsList | `.features_items` | `.padding-right` | - | OK |
| SearchInput | `#search_product` | `input[name="search"]` | - | OK |
| SearchButton | `#submit_search` | `button#submit_search` | - | OK |
| SearchedHeader | `h2.contains('Searched Products')` | `.features_items h2.title` | - | OK |
| ProductDetailName | `.product-information h2` | - | - | OK |
| productsItems | `.single-products` | `.product-image-wrapper` | - | OK |
| ViewProductLink | `.choose a[href*="/product_details/"]` | `a[href*="/product_details/"]` | - | OK |
| ProductCategory | `.product-information p` (Category) | `.product-information p:first` | - | OK |
| ProductPrice | `.product-information span span` | `.product-information span` | - | OK |
| ProductAvailability | `.product-information p` (Availability) | - | - | OK |
| ProductCondition | `.product-information p` (Condition) | - | - | OK |
| ProductBrand | `.product-information p` (Brand) | - | - | OK |
| QuantityInput | `#quantity` | `input[name="quantity"]` | - | OK |
| LeftSidebar | `.left-sidebar` | `.category-products` | - | OK |
| ProductOverlay | `.product-overlay` | `.overlay-content` | - | OK |
| CategoryPanel | `.panel-heading` | `.panel-title a` | - | OK |
| SubcategoryLinks | `.panel-body a` | - | - | OK |
| BrandsContainer | `.brands-name` | `.brands-name a` | - | OK |
| BrandLinks | `.brands-name a` | - | - | OK |
| RecommendedItems | `.recommended_items` | `.recommended_items .productinfo` | - | OK |
| RecommendedAddToCart | `.recommended_items .btn-default.add-to-cart` | - | - | OK |
| ReviewLink | `a[href="#reviews"]` | `.nav.nav-tabs a[href="#reviews"]` | - | OK |
| ReviewName | `#name` | `input#name` | - | OK |
| ReviewEmail | `#email` | `input#email` | - | OK |
| ReviewText | `#review` | `textarea#review` | - | OK |
| ReviewSubmitBtn | `button.contains('Submit')` | `input[value="Submit"]` | - | OK |
| ReviewSuccessMsg | `span.contains('Thank you for your review.')` | `.alert-success span` | - | OK |

### CheckoutPage
| Elemento | Seletor Atual | Alternativa 1 | Alternativa 2 | Status/Historico |
|----------|---------------|---------------|---------------|------------------|
| CommentInput | `textarea[name="message"]` | `#message` | - | OK |
| NameOnCard | `[name="name_on_card"]` | `input[name="name_on_card"]` | - | OK |
| CardNumber | `[name="card_number"]` | `input[name="card_number"]` | - | OK |
| CardCvc | `[name="cvc"]` | `input[name="cvc"]` | - | OK |
| CardExpiryMonth | `[name="expiry_month"]` | `input[name="expiry_month"]` | - | OK |
| CardExpiryYear | `[name="expiry_year"]` | `input[name="expiry_year"]` | - | OK |
| ProceedToCheckoutBtn | `a.contains('Proceed To Checkout')` | `a[href="/checkout"]` | - | OK |
| PlaceOrderBtn | `a.contains('Place Order')` | `a[href="/payment"]` | - | OK |
| PayAndConfirmBtn | `button.contains('Pay and Confirm Order')` | `#submit` | - | OK |
| DownloadInvoiceLink | `a.contains('Download Invoice')` | `a[href*="/download_invoice"]` | - | OK |
| ViewCartLink | `a.contains('View Cart')` | `u.contains('View Cart')` | - | OK |
| ContinueShoppingBtn | `button.contains('Continue Shopping')` | `.btn.close-modal` | - | OK |
| AddToCartBtn | `button.contains('Add to cart')` | `.btn-default.cart` | - | OK |
| CartPrice | `.cart_price` | `td.cart_price` | - | OK |
| CartQuantity | `.cart_quantity` | `td.cart_quantity` | - | OK |
| CartTotal | `.cart_total` | `td.cart_total` | - | OK |
| CartDescription | `.cart_description` | `td.cart_description` | - | OK |
| CartTableRows | `tbody tr` | `.cart_info tbody tr` | - | OK |
| CartDeleteBtn | `.cart_quantity_delete` | `a.cart_quantity_delete` | - | OK |
| DeliveryAddress | `#address_delivery` | `.address_delivery` | - | OK |
| InvoiceAddress | `#address_invoice` | `.address_invoice` | - | OK |
| CheckoutStepHeaders | `.step-one h2` | `.step h2` | - | OK |

---

**Documento gerado em:** 2026-05-27
