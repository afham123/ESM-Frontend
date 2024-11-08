export const filterData = [
    {
        "label": "Item Name",
        "option": "name"
    },
    {
        "label": "Category",
        "option": "category"
    },
    {
        "label": "Company",
        "option": "company"
    },
    {
        "label": "contact",
        "option": "contact_num"
    },
    {
        "label": "Email",
        "option": "email"
    },
    {
        "label": "Location",
        "option": "location"
    },
    {
        "label": "GST No.",
        "option": "GST_No"
    },
    {
        "label": "Turnover(GST)",
        "option": "GST_Turnover"
    },
    {
        "label": "Remark",
        "option": "Remark"
    },
    {
        "label": "Supplier Type",
        "option": "Supplier_Type"
    },
    {
        "label": "Enquiry Date",
        "option": "EnqDate"
    },
    {
        "label": "status",
        "option": "status"
    },
    {
        "label": "Enquiry number",
        "option": "Enq_num"
    }
]

export function getLabel(option){
    const index = filterData.findIndex(e=>e.option===option);
    if(index===-1) return '';
    return filterData[index];
}

export function getOption(label){
    const index = filterData.findIndex(e=>e.label===label);
    if(index===-1) return '';
    return filterData[index]
}