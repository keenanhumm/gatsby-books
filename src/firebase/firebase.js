import firebaseConfig from "./config"

class Firebase {
  constructor(app) {
    if (!firebaseInstance) {
      app.initializeApp(firebaseConfig)

      this.auth = app.auth()
      this.db = app.firestore()
      this.functions = app.functions()
      this.storage = app.storage()
    }
  }

  getUserProfile({ userId, onSnapshot }) {
    return this.db
      .collection("profiles")
      .where("userId", "==", userId)
      .limit(1)
      .onSnapshot(onSnapshot)
  }

  async login({ email, password }) {
    return this.auth.signInWithEmailAndPassword(email, password)
  }

  async createAuthor({ authorName }) {
    const createAuthorCallable = this.functions.httpsCallable("createAuthor")

    return createAuthorCallable({ authorName })
  }

  async register({ email, password, username }) {
    // create user
    await this.auth.createUserWithEmailAndPassword(email, password)

    // create profile
    const createProfileCallable = this.functions.httpsCallable("createProfile")
    return createProfileCallable({
      username,
    })
  }

  async logout() {
    await this.auth.signOut()
  }

  async postComment({ text, bookId }) {
    const postCommentCallable = this.functions.httpsCallable("postComment")
    postCommentCallable({
      text,
      bookId,
    })
  }

  subscribeToBookComments({ bookId, onSnapshot }) {
    const book = this.db.collection("books").doc(bookId)
    return this.db
      .collection("comments")
      .where("book", "==", book)
      .orderBy("dateCreated", "desc")
      .onSnapshot(onSnapshot)
  }
}

let firebaseInstance

function getFirebaseInstance(app) {
  if (!firebaseInstance && app) {
    firebaseInstance = new Firebase(app)
    return firebaseInstance
  } else if (firebaseInstance) {
    return firebaseInstance
  } else {
    return null
  }
}

export default getFirebaseInstance
