

export interface FisheryData {
  FisheryManagement?: string
  Habitat?: string
  HabitatImpacts?: string
  ImageGallery: any
  Location?: string
  Management?: string
  NOAAFisheriesRegion: string
  Population?: string
  PopulationStatus?: string
  ScientificName: string
  SpeciesAliases: string
  SpeciesIllustrationPhoto: SpeciesIllustrationPhoto
  SpeciesName: string
  AnimalHealth?: string
  Availability: string
  Biology: string
  Bycatch?: string
  Calories?: string
  Carbohydrate?: string
  Cholesterol?: string
  Color?: string
  DiseaseTreatmentandPrevention: any
  DiseasesinSalmon?: string
  DisplayedSeafoodProfileIllustration: any
  EcosystemServices?: string
  EnvironmentalConsiderations?: string
  EnvironmentalEffects?: string
  FarmingMethods?: string
  FarmingMethods_?: string
  FatTotal?: string
  Feeds_?: string
  Feeds?: string
  FiberTotalDietary?: string
  FishingRate?: string
  Harvest?: string
  HarvestType: string
  HealthBenefits?: string
  Human_Health_?: string
  HumanHealth?: string
  PhysicalDescription: string
  Production?: string
  Protein?: string
  Quote: string
  QuoteBackgroundColor: string
  Research?: string
  SaturatedFattyAcidsTotal?: string
  Selenium?: string
  ServingWeight?: string
  Servings?: string
  Sodium?: string
  Source: string
  SugarsTotal?: string
  Taste?: string
  Texture?: string
  Path: string
  last_update: string
}

export interface SpeciesIllustrationPhoto {
  src: string
  alt: string
  title: string
}

export interface Regions {
  id: number
  name: string
}

export interface RegionalData {
  regionId: number
  region: string
  averageCalories: number
  averageFat: number
  fishDetails: FishDetails[]
}

export interface FishDetails {
  fishName: string
  imageUrl: string
  caloriesPerServing: number
  fatPerServing: number
  description: string
}
