export default  {
  attributes: {
    include: ['id', 'userName'],
    exclude: [
      'password',
      'email',
      'exp',
      'level',
      'firstName',
      'lastName',
    ]
  }
};