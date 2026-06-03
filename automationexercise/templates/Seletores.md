# Repositório de Seletores - Automation Exercise
**Versão:** 1.1.0<br>
**Metodologia:** POM (Page Object Model)<br>
**Responsável:** Rafael Barelli

---

## Estrutura por Página

Cada pagina e dividida em duas seções:
- **Seletores (Getters):** Referências diretas a elementos DOM
- **Métodos:** Ações encapsuladas que utilizam os seletores

---

### HomePage

#### Seletores (Getters)
| Elemento | Seletor Atual | Alternativa 1 | Alternativa 2 | Status |
|----------|---------------|---------------|---------------|--------|
| logo | `img[alt="Website for automation practice"]` | `.logo img` | `a[href="/"] img` | OK |
| signupLoginLink | `a[href="/login"]` (`.first()`) | `i.fa-lock` | `contains('Signup / Login')` | OK |
| deleteAccountLink | `a[href="/delete_account"]` | `i.fa-trash-o` | `contains('Delete Account')` | OK |
| logoutLink | `a[href="/logout"]` | `i.fa-lock` | `contains('Logout')` | OK |
| contactUsLink | `a[href="/contact_us"]` | `i.fa-envelope` | `contains('Contact us')` | OK |
| testCasesLink | `a[href="/test_cases"]` (`.first()`) | `i.fa-list` | `contains('Test Cases')` | OK |
| productsLink | `a[href="/products"]` | `i.fa-card` | `contains('Products')` | OK |
| cartLink | `a[href="/view_cart"]` (`.first()`) | `i.fa-shopping-cart` | `contains('Cart')` | OK |
| loggedInIndicator | `li.contains('Logged in as')` | `ul.nav` | - | OK |
| subscribeEmail | `#susbscribe_email` | `input[name="email"]` | - | OK |
| subscribeButton | `#subscribe` | `button#subscribe` | - | OK |
| subscribeSuccess | `#success-subscribe` | `.alert-success` | - | OK |
| subscriptionWidget | `.single-widget` | `.footer-widget` | - | OK |
| subscriptionHeader | `.single-widget h2` | `.single-widget .title` | - | OK |
| scrollUpIcon | `i[class*="angle-up"]` | `a#scrollUp` | - | OK |

#### Métodos
| Metodo | Descrição | Seletor Interno | Status |
|--------|-----------|-----------------|--------|
| `clickSignupLogin()` | Clica no link Signup / Login | `signupLoginLink` | OK |
| `verifyLoggedInAs(username)` | Verifica usuario logado com nome | `loggedInIndicator` | OK |
| `clickDeleteAccount()` | Clica em Delete Account | `deleteAccountLink` | OK |
| `clickLogout()` | Clica em Logout | `logoutLink` | OK |
| `clickContactUs()` | Clica em Contact Us | `contactUsLink` | OK |
| `clickTestCases()` | Clica em Test Cases | `testCasesLink` | OK |
| `clickProducts()` | Clica em Products | `productsLink` | OK |
| `clickCart()` | Clica em Cart | `cartLink` | OK |
| `verifyHomePageTitle()` | Verifica titulo da homepage | `h2.contains(uiData.homepage.title)` | OK |

---

### LoginPage

#### Seletores (Getters)
| Elemento | Seletor Atual | Alternativa 1 | Alternativa 2 | Status |
|----------|---------------|---------------|---------------|--------|
| newUserSignupHeader | `h2.contains('New User Signup!')` | `.signup-form h2` | - | OK |
| loginToYourAccountHeader | `h2.contains('Login to your account')` | `.login-form h2` | - | OK |
| nameInput | `input[data-qa="signup-name"]` | `[placeholder="Name"]` | `input[name="name"]` | OK |
| emailInput | `input[data-qa="signup-email"]` | `form[action="/signup"] [placeholder="Email Address"]` | - | OK |
| signupButton | `button[data-qa="signup-button"]` | `button.btn-default`.contains('Signup') | - | OK |
| loginEmail | `input[data-qa="login-email"]` | `[placeholder="Email Address"]` | `input[name="email"]` | OK |
| loginPassword | `input[data-qa="login-password"]` | `[placeholder="Password"]` | `input[name="password"]` | OK |
| loginButton | `button[data-qa="login-button"]` | `button.btn-default`.contains('Login') | - | OK |

#### Métodos
| Metodo | Descrição | Seletor Interno | Status |
|--------|-----------|-----------------|--------|
| `verifyNewUserSignupHeader()` | Valida header "New User Signup!" | `newUserSignupHeader` | OK |
| `verifyLoginHeader()` | Valida header "Login to your account" | `loginToYourAccountHeader` | OK |
| `clickSignup()` | Clica no botao Signup | `signupButton` | OK |
| `login(email, password)` | Preenche email/senha e clica Login | `loginEmail` + `loginPassword` + `loginButton` | OK |
| `fillEmail(email)` | Preenche apenas o email | `loginEmail` | OK |
| `fillPassword(password)` | Preenche apenas a senha | `loginPassword` | OK |
| `clickLogin()` | Clica no botao Login | `loginButton` | OK |
| `verifyLoginErrorMessage()` | Valida mensagem de erro de login | `cy.contains(uiData.errors.login)` | OK |
| `verifyEmailExistError()` | Valida erro de email ja existente | `cy.contains(uiData.errors.emailExist)` | OK |

---

### SignupPage

#### Seletores (Getters)
| Elemento | Seletor Atual | Alternativa 1 | Alternativa 2 | Status |
|----------|---------------|---------------|---------------|--------|
| accountInfoHeader | `h2.contains('Enter Account Information')` | `.login-form h2 b` | - | OK |
| genderMale | `#id_gender1` | `input[value="Mr"]` | - | OK |
| genderFemale | `#id_gender2` | `input[value="Mrs"]` | - | OK |
| password | `#password` | `input[name="password"]` | - | OK |
| days | `#days` | `select[name="days"]` | - | OK |
| months | `#months` | `select[name="months"]` | - | OK |
| years | `#years` | `select[name="years"]` | - | OK |
| newsletterCheckbox | `#newsletter` | `input[name="newsletter"]` | - | OK |
| specialOffersCheckbox | `#optin` | `input[name="optin"]` | - | OK |
| firstName | `#first_name` | `input[name="first_name"]` | - | OK |
| lastName | `#last_name` | `input[name="last_name"]` | - | OK |
| company | `#company` | `input[name="company"]` | - | OK |
| address1 | `#address1` | `input[name="address1"]` | - | OK |
| address2 | `#address2` | `input[name="address2"]` | - | OK |
| country | `#country` | `select[name="country"]` | - | OK |
| state | `#state` | `input[name="state"]` | - | OK |
| city | `#city` | `input[name="city"]` | - | OK |
| zipcode | `#zipcode` | `input[name="zipcode"]` | - | OK |
| mobileNumber | `#mobile_number` | `input[name="mobile_number"]` | - | OK |
| createAccountButton | `button[data-qa="create-account"]` | `button`.contains('Create Account') | - | OK |

#### Métodos
| Metodo | Descrição | Seletor Interno | Status |
|--------|-----------|-----------------|--------|
| `verifyAccountInfoHeader()` | Valida header "Enter Account Information" | `accountInfoHeader` | OK |
| `selectGender(gender)` | Seleciona genero (male/female) | `genderMale` ou `genderFemale` | OK |
| `fillDateOfBirth(day, month, year)` | Preenche data de nascimento | `days` + `months` + `years` | OK |
| `fillAddress(address)` | Preenche endereco completo | `firstName` a `mobileNumber` | OK |
| `clickCreateAccount()` | Clica em Create Account | `createAccountButton` | OK |

---

### AccountPage

#### Seletores (Getters)
| Elemento | Seletor Atual | Alternativa 1 | Alternativa 2 | Status |
|----------|---------------|---------------|---------------|--------|
| accountCreatedHeader | `h2.contains('Account Created!')` | `b.contains('Account Created!')` | - | OK |
| accountDeletedHeader | `h2.contains('Account Deleted!')` | `b.contains('Account Deleted!')` | - | OK |
| continueButton | `a[data-qa="continue-button"]` | `a.btn-primary` | `a.contains('Continue')` | OK |

#### Métodos
| Metodo | Descrição | Seletor Interno | Status |
|--------|-----------|-----------------|--------|
| `verifyAccountCreated()` | Valida "Account Created!" | `accountCreatedHeader` | OK |
| `verifyAccountDeleted()` | Valida "Account Deleted!" | `accountDeletedHeader` | OK |
| `clickContinue()` | Clica em Continue | `continueButton` | OK |

---

### ContactUsPage

#### Seletores (Getters)
| Elemento | Seletor Atual | Alternativa 1 | Alternativa 2 | Status |
|----------|---------------|---------------|---------------|--------|
| getInTouchHeader | `h2.contains('Get In Touch')` | `.contact-form h2.title` | - | OK |
| nameInput | `input[data-qa="name"]` | `input[name="name"]` | - | OK |
| emailInput | `input[data-qa="email"]` | `input[name="email"]` | - | OK |
| subjectInput | `input[data-qa="subject"]` | `input[name="subject"]` | - | OK |
| messageInput | `textarea[data-qa="message"]` | `textarea[name="message"]` | - | OK |
| fileInput | `input[type="file"]` | `input[name="upload_file"]` | - | OK |
| submitButton | `input[data-qa="submit-button"]` | `input[type="submit"]` | - | OK |
| homeButton | `a.btn-success[href="/"]` | `span.contains(' Home')` | - | OK |
| successMessage | `.status.alert.alert-success` | `.contact-form .alert-success` | - | OK |

#### Métodos
| Metodo | Descrição | Seletor Interno | Status |
|--------|-----------|-----------------|--------|
| `verifyGetInTouchHeader()` | Valida header "Get In Touch" | `getInTouchHeader` | OK |
| `verifySuccessMessage()` | Valida mensagem de sucesso | `successMessage` | OK |
| `fillContactForm(name, email, subject, message)` | Preenche formulario de contato | `nameInput` + `emailInput` + `subjectInput` + `messageInput` | OK |
| `uploadFile(filePath)` | Upload de arquivo | `fileInput` | OK |
| `clickSubmit()` | Clica em Submit | `submitButton` | OK |
| `clickHome()` | Clica em Home | `homeButton` | OK |

---

### TestCasesPage

#### Seletores (Getters)
| Elemento | Seletor Atual | Alternativa 1 | Alternativa 2 | Status |
|----------|---------------|---------------|---------------|--------|
| pageTitle | `h2.contains('Test Cases')` | `b.contains('Test Cases')` | - | OK |

#### Métodos
| Metodo | Descrição | Seletor Interno | Status |
|--------|-----------|-----------------|--------|
| `verifyPageTitle()` | Valida titulo "Test Cases" | `pageTitle` | OK |

---

### ProductsPage

#### Seletores (Getters)
| Elemento | Seletor Atual | Alternativa 1 | Alternativa 2 | Status |
|----------|---------------|---------------|---------------|--------|
| productsHeader | `h2.contains('All Products')` | `.features_items h2.title` | - | OK |
| productsList | `.features_items` | `.padding-right` | - | OK |
| productsItems | `.single-products` (timeout: 10000) | `.product-image-wrapper` | - | OK |
| viewProductLinks | `.choose a[href*="/product_details/"]` | `a[href*="/product_details/"]` | - | OK |
| searchInput | `#search_product` | `input[name="search"]` | - | OK |
| searchButton | `#submit_search` | `button#submit_search` | - | OK |
| searchedProductsHeader | `h2.contains('Searched Products')` | `.features_items h2.title` | - | OK |
| productName | `.product-information h2` | - | - | OK |
| productCategory | `.product-information p` (Category) | `.product-information p:first` | - | OK |
| productPrice | `.product-information span span` | `.product-information span` | - | OK |
| productAvailability | `.product-information p` (Availability) | - | - | OK |
| productCondition | `.product-information p` (Condition) | - | - | OK |
| productBrand | `.product-information p` (Brand) | - | - | OK |
| quantityInput | `#quantity` | `input[name="quantity"]` | - | OK |
| productOverlay | `.product-overlay` | `.overlay-content` | - | OK |
| leftSidebar | `.left-sidebar` | `.category-products` | - | OK |
| categoryPanel | `.panel-heading` | `.panel-title a` | - | OK |
| subcategoryLinks | `.panel-body a` | - | - | OK |
| brandsContainer | `.brands-name` | `.brands-name a` | - | OK |
| brandLinks | `.brands-name a` | - | - | OK |
| recommendedItems | `.recommended_items` | `.recommended_items .productinfo` | - | OK |
| recommendedAddToCart | `.recommended_items .btn-default.add-to-cart` | - | - | OK |
| recommendedProductInfo | `.recommended_items .productinfo` | - | - | OK |
| reviewLink | `a[href="#reviews"]` | `.nav.nav-tabs a[href="#reviews"]` | - | OK |
| reviewNameInput | `#name` | `input#name` | - | OK |
| reviewEmailInput | `#email` | `input#email` | - | OK |
| reviewTextInput | `#review` | `textarea#review` | - | OK |
| reviewSubmitButton | `button.contains('Submit')` | `input[value="Submit"]` | - | OK |
| reviewSuccessMessage | `span.contains('Thank you for your review.')` | `.alert-success span` | - | OK |

#### Métodos
| Metodo | Descrição | Seletor Interno | Status |
|--------|-----------|-----------------|--------|
| `verifyAllProductsPage()` | Valida header "All Products" | `productsHeader` | OK |
| `verifyProductsList()` | Valida lista de produtos visivel | `productsItems` | OK |
| `clickViewProduct()` | Clica no primeiro "View Product" | `viewProductLinks` | OK |
| `clickProductByName(name)` | Clica "View Product" por nome do produto | `product-image-wrapper` + `a[href*="/product_details/"]` | OK |
| `verifyProductDetailPage()` | Valida pagina de detalhes do produto | `productName` | OK |
| `verifyProductDetails()` | Valida todos os detalhes (nome, categoria, preco, etc) | `productName` a `productBrand` | OK |
| `searchProduct(searchTerm)` | Digita termo e clica em buscar | `searchInput` + `searchButton` | OK |
| `verifySearchedProducts()` | Valida header "Searched Products" | `searchedProductsHeader` | OK |
| `verifyReviewSectionVisible()` | Valida secao "Write Your Review" | `reviewLink` | OK |
| `fillReview(name, email, text)` | Preenche formulario de review | `reviewNameInput` + `reviewEmailInput` + `reviewTextInput` | OK |
| `submitReview()` | Clica em Submit do review | `reviewSubmitButton` | OK |
| `verifyReviewSuccess()` | Valida mensagem de sucesso do review | `reviewSuccessMessage` | OK |
| `clickCategory(categoryName)` | Clica em categoria na sidebar | `categoryPanel` | OK |
| `clickSubcategory(subcategoryName)` | Clica em subcategoria | `subcategoryLinks` | OK |
| `verifyCategoryPageHeader(category, subcategory)` | Valida header da pagina de categoria | `h2.contains(...)` | OK |
| `verifyCategoryHeaderVisible()` | Valida header "Category" na sidebar | `leftSidebar.find('h2')` | OK |
| `verifyBrandsHeaderVisible()` | Valida header "Brands" na sidebar | `h2.contains(uiData.headers.brandsHeader)` | OK |
| `verifyBrandPageHeader(brandName)` | Valida header da pagina de marca | `productsList` | OK |
| `clickBrand(brandName)` | Clica em marca na sidebar | `brandLinks` | OK |
| `addToCartOverlay(index)` | Passa mouse e clica "Add to cart" no overlay | `productsItems` + `productOverlay.find('.btn')` | OK |

---

### CheckoutPage

#### Seletores (Getters)
| Elemento | Seletor Atual | Alternativa 1 | Alternativa 2 | Status |
|----------|---------------|---------------|---------------|--------|
| commentInput | `textarea[name="message"]` | `#message` | - | OK |
| nameOnCard | `[name="name_on_card"]` | `input[name="name_on_card"]` | - | OK |
| cardNumber | `[name="card_number"]` | `input[name="card_number"]` | - | OK |
| cardCvc | `[name="cvc"]` | `input[name="cvc"]` | - | OK |
| cardExpiryMonth | `[name="expiry_month"]` | `input[name="expiry_month"]` | - | OK |
| cardExpiryYear | `[name="expiry_year"]` | `input[name="expiry_year"]` | - | OK |
| proceedToCheckoutButton | `a.contains('Proceed To Checkout')` | `a[href="/checkout"]` | - | OK |
| placeOrderButton | `a.contains('Place Order')` | `a[href="/payment"]` | - | OK |
| payAndConfirmButton | `button.contains('Pay and Confirm Order')` | `#submit` | - | OK |
| downloadInvoiceLink | `a.contains('Download Invoice')` | `a[href*="/download_invoice"]` | - | OK |
| viewCartLink | `a.contains('View Cart')` | `u.contains('View Cart')` | - | OK |
| continueShoppingButton | `button.contains('Continue Shopping')` | `.btn.close-modal` | - | OK |
| addToCartButton | `button.contains('Add to cart')` | `.btn-default.cart` | - | OK |
| cartPrice | `.cart_price` | `td.cart_price` | - | OK |
| cartQuantity | `.cart_quantity` | `td.cart_quantity` | - | OK |
| cartTotal | `.cart_total` | `td.cart_total` | - | OK |
| cartDescription | `.cart_description` | `td.cart_description` | - | OK |
| cartTableRows | `tbody tr` | `.cart_info tbody tr` | - | OK |
| cartDeleteButton | `.cart_quantity_delete` | `a.cart_quantity_delete` | - | OK |
| deliveryAddress | `#address_delivery` | `.address_delivery` | - | OK |
| invoiceAddress | `#address_invoice` | `.address_invoice` | - | OK |
| checkoutStepHeaders | `.step-one h2` | `.step h2` | - | OK |

#### Métodos
| Metodo | Descrição | Seletor Interno | Status |
|--------|-----------|-----------------|--------|
| `fillPaymentDetails(paymentData)` | Preenche dados de pagamento | `nameOnCard` + `cardNumber` + `cardCvc` + `cardExpiryMonth` + `cardExpiryYear` | OK |
| `clickProceedToCheckout()` | Clica em "Proceed To Checkout" | `proceedToCheckoutButton` | OK |
| `clickPlaceOrder()` | Clica em "Place Order" | `placeOrderButton` | OK |
| `clickPayAndConfirm()` | Clica em "Pay and Confirm Order" | `payAndConfirmButton` | OK |
| `clickDownloadInvoice()` | Clica em "Download Invoice" | `downloadInvoiceLink` | OK |
| `clickViewCart()` | Clica em "View Cart" | `viewCartLink` | OK |
| `clickContinueShopping()` | Clica em "Continue Shopping" | `continueShoppingButton` | OK |
| `verifyCartPageVisible()` | Valida pagina do carrinho | URL + `h2` | OK |
| `verifyOrderPlaced()` | Valida "Order Placed!" | `h2.contains(uiData.checkout.orderPlaced)` | OK |
| `verifyAddressDetailsHeader()` | Valida "Address Details" | `checkoutStepHeaders` | OK |
| `clickContinueAfterOrder()` | Clica em "Continue" apos pedido | `a.contains(uiData.buttons.continue)` | OK |
| `clickAddToCart()` | Clica em "Add to cart" | `addToCartButton` | OK |

---

**Documento gerado em:** 2026-06-02
