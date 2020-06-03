class Like {
   constructor() {
     this.likes = [];
   }

   addLike(id, title, author, img) {
      const likeObj = {
        id: this.likes.length + 1,
        title,
        author,
        img
      }

      this.likes = [...this.likes, likeObj];
      return likeObj;
   }

   unLike(id) {
       const index = this.likes.findIndex(like => like.id === id);
       const removedLike = this.likes.splice(index, 1);
       return removedLike;
   }

   isLiked(id) {
     const index = this.likes.findIndex(likes => likes.id === id);
     return index >= 0;
   }


   getAllLikes() {
     return this.likes.length;
   }
}

export default Like;