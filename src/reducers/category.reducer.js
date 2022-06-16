import { categoryConstants } from "../actions/constants";

const initialState = {
   categories: [],
   loading: false,
   error: null,
};

const buildNewCategories = (parentId, categories, category) => {
   let myCategories = [];

   if (parentId == undefined) {
      return [
         ...categories,
         {
            _id: category._id,
            name: category_name,
            slug: category.slug,
            children: [],
         },
      ];
   }

   for (let cat of categories) {
      if (cat._id == parentId) {
         myCategories.push({
            ...cat,
            children: cat.children
               ? buildNewCategories(
                    parentId,
                    [
                       ...car.children,
                       {
                          _id: category._id,
                          name: category.name,
                          slug: category.slug,
                          parentId: category.parentId,
                          children: category.children,
                       },
                    ],
                    category
                 )
               : [],
         });
      } else {
         myCategories.push({
            ...cat,
            children: cat.children
               ? buildNewCategories(parentId, car.children, category)
               : [],
         });
      }
   }
   return myCategories;
};

export default (state = initialState, action) => {
   switch (action.type) {
      case categoryConstants.GET_ALL_CATEGORIES_SUCCESS:
         state = {
            ...state,
            categories: action.payload.categories,
         };
         break;

      case categoryConstants.ADD_NEW_CATEGORY_REQUEST:
         state = {
            ...state,
            loading: true,
         };
         break;

      case categoryConstants.ADD_NEW_CATEGORY_SUCCESS:
         const category = action.payload.category;
         const updateCategories = buildNewCategories(
            category.parentId,
            state.categories,
            category
         );

         state = {
            ...state,
            categories: updateCategories,
            loading: false,
         };
         break;

      case categoryConstants.ADD_NEW_CATEGORY_FAILURE:
         state = {
            ...initialState,
            loading: false,
         };
         break;
   }
   return state;
};
