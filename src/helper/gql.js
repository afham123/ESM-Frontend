export function generateDynamicQuery(fields){
  return `
      query ItemFetchQuery($skip: Int, $limit: Int, $searchQuery: String, $scroll_id: String, $advanceQuery: AdvanceQueryInput, $token: String) {
        items(skip: $skip, limit: $limit, searchQuery: $searchQuery, scroll_id: $scroll_id, AdvanceQuery: $advanceQuery, token: $token) {
          data { 
            ${fields.join(' ')} 
          } 
            totalDocs scroll_id message success
        }
      }
    `;
}
  
export function addUpdateMututation(){
  return `
    mutation  AddItemMutation($item: AddItemInput!, $token: String){
        addItem(item: $item, token: $token){
          msg success
        } 
    }
  `
}

export function deleteItemMutation(){
  return `
  mutation DeleteItemsMutation($ids: [ID!], $token: String){
      deleteItem(ids: $ids, token: $token){
        msg success
      }
  }
  `
}

export function uploadItemsMutation(){
  return `
  mutation uploadItemsMutation($items: [AddItemInput]!, $token: String) {
    uploadItems(Items: $items, token: $token) {
      msg success
    }
  }
  `
}