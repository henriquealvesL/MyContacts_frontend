class CategoryMapper {
  toDomain(persistenceCategory) {
    return {
      id: persistenceCategory.id,
      name: persistenceCategory.name,
    };
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new CategoryMapper();
