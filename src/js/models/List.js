 class List {
    constructor(){
     this.items = [];
    }

    addItem(count, unit, ingredient) {
       const obj = {
         id: this.items.length + 1,
         count,
         unit,
         ingredient
       }
       this.items = [...this.items, obj];
       return obj;
    }

    deleteItem(id) {
      const index = this.items.findIndex(item => item.id === id);
      const item = this.items.splice(index, 1);
      return item;
    }

    updateItem(id,countValue){
       const item = this.items.find(item => item.id === id);
       item.count = countValue;
       return item;
    }
 }

 export default List;