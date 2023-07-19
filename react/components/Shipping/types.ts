/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
export interface OrderFormType {
    id: string
    items: Item[]
    value: number
    totalizers: Totalizer[]
    marketingData: MarketingData
    canEditData: boolean
    loggedIn: boolean
    paymentData: PaymentData
    messages: Messages
    shipping: Shipping
    userProfileId: string
    userType: string
    clientProfileData: ClientProfileData
    clientPreferencesData: ClientPreferencesData
    allowManualPrice: boolean
    customData: any
  }
  
  export interface ClientProfileData {
    email: string
    firstName: string
    lastName: string
    document: string
    documentType: string
    phone: string
    corporateName: string
    tradeName: string
    corporateDocument: string
    stateInscription: string
    corporatePhone: string
    isCorporate: boolean
    profileCompleteOnLoading: boolean
    profileErrorOnLoading: boolean
  }
  
  export interface ClientPreferencesData {
    locale: string
    optInNewsletter: boolean
  }
  
  export interface Item {
    additionalInfo: AdditionalInfo
    attachments: any[]
    attachmentOfferings: any[]
    bundleItems: any[]
    availability: string
    detailUrl: string
    id: string
    imageUrls: { [key: string]: string }
    listPrice: number
    measurementUnit: string
    name: string
    offerings: any[]
    price: number
    priceTags: any[]
    productCategories: { [key: string]: string }
    productCategoryIds: string
    productRefId: string
    productId: string
    quantity: number
    seller: string
    sellingPrice: number
    skuName: string
    skuSpecifications: SkuSpecification[]
    unitMultiplier: number
    uniqueId: string
    refId: string
    isGift: boolean
    priceDefinition: PriceDefinition
  }
  
  export interface AdditionalInfo {
    brandName: string
  }
  
  export interface PriceDefinition {
    calculatedSellingPrice: number
    total: number
    sellingPrices: SellingPrice[]
  }
  
  export interface SellingPrice {
    quantity: number
    value: number
  }
  
  export interface SkuSpecification {
    fieldName: string
    fieldValues: string[]
  }
  
  export interface MarketingData {
    coupon: string
    utmCampaign: string
    utmMedium: string
    utmSource: string
    utmiCampaign: string
    utmiPart: string
    utmiPage: string
  }
  
  export interface Messages {
    couponMessages: any[]
    generalMessages: any[]
  }
  
  export interface PaymentData {
    paymentSystems: PaymentSystem[]
    payments: any[]
    installmentOptions: InstallmentOption[]
    availableAccounts: any[]
    isValid: boolean
  }
  
  export interface InstallmentOption {
    paymentSystem: string
    installments: Installment[]
  }
  
  export interface Installment {
    count: number
    hasInterestRate: boolean
    interestRate: number
    value: number
    total: number
  }
  
  export interface PaymentSystem {
    id: string
    name: string
    groupName: string
    validator: any
    stringId: string
    requiresDocument: boolean
    isCustom: boolean
    description: string
    requiresAuthentication: boolean
    dueDate: Date
  }
  
  export interface Validator {
    regex: null
    mask: null
    cardCodeRegex: null
    cardCodeMask: null
    weights: null
    useCvv: boolean
    useExpirationDate: boolean
    useCardHolderName: boolean
    useBillingAddress: boolean
  }
  
  export interface Shipping {
    countries: string[]
    availableAddresses: Address[]
    selectedAddress: Address
    deliveryOptions: any[]
    pickupOptions: any[]
    isValid: boolean
  }
  
  export interface Address {
    addressType: string
    receiverName: string
    addressId: string
    isDisposable: boolean
    postalCode: string
    city: string
    state: string
    country: string
    street: string
    number: string
    neighborhood: string
    complement: string
    reference: string
    geoCoordinates: any[]
  }
  
  export interface Totalizer {
    id: string
    name: string
    value: number
  }