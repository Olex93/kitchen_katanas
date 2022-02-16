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
      filterItem: 'Boning Knife',
      checked: false
    },
    {
      category: 'Knife Type',
      filterItem: 'Bread Knife',
      checked: false
    },
    {
      category: 'Knife Type',
      filterItem: 'Carving Knife',
      checked: false
    },
    {
      category: 'Knife Type',
      filterItem: 'Chef Knife',
      checked: false
    },
    {
      category: 'Knife Type',
      filterItem: 'Cleaver',
      checked: false
    },
    {
      category: 'Knife Type',
      filterItem: 'Filleting Knife',
      checked: false
    },
    {
      category: 'Knife Type',
      filterItem: 'Nakiri',
      checked: false
    },
    {
      category: 'Knife Type',
      filterItem: 'Paring Knife',
      checked: false
    },
    {
      category: 'Knife Type',
      filterItem: 'Peeling Knife',
      checked: false
    },
    {
      category: 'Knife Type',
      filterItem: 'Santoku',
      checked: false
    },
    {
      category: 'Knife Type',
      filterItem: 'Utility Knife',
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



