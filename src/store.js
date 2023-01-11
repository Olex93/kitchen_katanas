import { atom } from "recoil";

export const filterProductsGlobalState = atom({
  key: "filterProductsGlobalState",
  default: [],
});


export const selectedFiltersGlobalState = atom({
  key: "selectedFiltersGlobalState",
  default: [],
});


export const checkboxFiltersGlobalState = atom({
  key: "checkboxFiltersGlobalState",
  default: [
    {
      category: 'Knife Type',
      filterItem: 'Boning Knives',
      checked: false
    },
    {
      category: 'Knife Type',
      filterItem: 'Bread Knives',
      checked: false
    },
    {
      category: 'Knife Type',
      filterItem: 'Bunka Knives',
      checked: false
    },
    {
      category: 'Knife Type',
      filterItem: 'Carving Knives',
      checked: false
    },
    {
      category: 'Knife Type',
      filterItem: 'Chef Knives',
      checked: false
    },
    {
      category: 'Knife Type',
      filterItem: 'Cleaver',
      checked: false
    },
    {
      category: 'Knife Type',
      filterItem: 'Filleting Knives',
      checked: false
    },
    {
      category: 'Knife Type',
      filterItem: 'Gyuto Knives',
      checked: false
    },
    {
      category: 'Knife Type',
      filterItem: 'Higonokami Knives',
      checked: false
    },
    {
      category: 'Knife Type',
      filterItem: 'Kiritsuke Knives',
      checked: false
    },
    {
      category: 'Knife Type',
      filterItem: 'Nakiri',
      checked: false
    },
    {
      category: 'Knife Type',
      filterItem: 'Paring Knives',
      checked: false
    },
    {
      category: 'Knife Type',
      filterItem: 'Peeling Knives',
      checked: false
    },
    {
      category: 'Knife Type',
      filterItem: 'Petty Knives',
      checked: false
    },
    {
      category: 'Knife Type',
      filterItem: 'Santoku',
      checked: false
    },
    {
      category: 'Knife Type',
      filterItem: 'Utility Knives',
      checked: false
    },

    //Origin
    {
      category: 'Knife Origin',
      filterItem: 'British Knives',
      checked: false
    },
    {
      category: 'Knife Origin',
      filterItem: 'Chinese Knives',
      checked: false
    },
    {
      category: 'Knife Origin',
      filterItem: 'German Knives',
      checked: false
    },
    {
      category: 'Knife Origin',
      filterItem: 'Japanese Knives',
      checked: false
    },

    //Blade Material
    {
      category: 'Blade Material',
      filterItem: 'Ceramic',
      checked: false
    },
    {
      category: 'Blade Material',
      filterItem: 'Damascus Steel',
      checked: false
    },
    {
      category: 'Blade Material',
      filterItem: 'Stainless Steel',
      checked: false
    },
    {
      category: 'Blade Material',
      filterItem: 'Titanium',
      checked: false
    },

    //Handle Material
    {
      category: 'Handle Material',
      filterItem: 'Metal Handle',
      checked: false
    },
    {
      category: 'Handle Material',
      filterItem: 'Synthetic Handle',
      checked: false
    },
    {
      category: 'Handle Material',
      filterItem: 'Wooden Handle',
      checked: false
    },

    //Tang
    {
      category: 'Tang',
      filterItem: 'Full Tang',
      checked: false
    },
    {
      category: 'Tang',
      filterItem: 'Half Tang',
      checked: false
    },

    //Edge Type
    {
      category: 'Edge Type',
      filterItem: 'Serrated',
      checked: false
    },

    //Manufacture process
    {
      category: 'Manufacture Process',
      filterItem: 'Handmade',
      checked: false
    },

    {
      category: 'Manufacture Process',
      filterItem: 'Machine made',
      checked: false
    },

    //Featured
    {
      category: 'Featured',
      filterItem: 'Featured Knives',
      checked: false
    },

    //Misc
    {
      category: 'Knife Sharpeners',
      filterItem: 'Knife Sharpeners',
      checked: false
    },

  ],
});



