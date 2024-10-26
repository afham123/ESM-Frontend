export function generateDynamicQuery(fields){
  return `
      query ItemFetchQuery($skip: Int, $limit: Int, $searchQuery: String, $scroll_id: String, $advanceQuery: AdvanceQueryInput) {
        items(skip: $skip, limit: $limit, searchQuery: $searchQuery, scroll_id: $scroll_id, AdvanceQuery: $advanceQuery) {
          data { 
            ${fields.join(' ')} 
          } 
            totalDocs scroll_id 
        }
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