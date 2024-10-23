export function generateDynamicQuery(fields){
  return `
      query ItemFetchQuery($skip: Int, $limit: Int) {
        items(skip: $skip, limit: $limit) {
          ${fields.join(' ')} 
        }
        totalItem
      }
    `;
}
  
export function addUpdateMututation(){
  return `
    mutation  AddItemMutation($item: AddItemInput!){
        addItem(item: $item){
          msg success
        } 
    }
  `
}

export function deleteItemMutation(){
  return `
  mutation DeleteItemsMutation($ids: [ID!]){
      deleteItem(ids: $ids){
        msg success
      }
  }
  `
}

export function uploadItemsMutation(){
  return `
  mutation uploadItemsMutation($items: [AddItemInput]!) {
    uploadItems(Items: $items) {
      msg success
    }
  }
  `
}