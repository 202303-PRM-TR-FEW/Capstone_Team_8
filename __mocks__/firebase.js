const currentUser = {
  uid: "user-uid",
  photoURL: "user-photo-url",
};

const auth = jest.fn(() => ({
  currentUser,
}));

const firestore = {
  FieldValue: {
    serverTimestamp: jest.fn(() => "mock-timestamp"),
  },
  collection: jest.fn(() => ({
    add: jest.fn(),
  })),
};

export { auth, firestore };
