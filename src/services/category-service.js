const { categoryModel, userModel, productModel } = require('../db');

class CategoryService {
  constructor(categoryModel, userModel, productModel) {
    this.categoryModel = categoryModel;
    this.userModel = userModel;
    this.productModel = productModel;
  }

  async getAllCategory() {
    return await this.categoryModel.findAll();
  }
  async getCategoryOne(name) {
    return await this.categoryModel.findByName(name);
  }

  async getCategory(name) {
    if (!name) {
      return this.getAllCategory();
    }
    return this.getCategoryOne(name);
  }

  async addCategory(name) {
    const isExist = await this.categoryModel.findByName(name);
    if (isExist) {
      throw new Error('name is already exist.');
    }

    if (name == null) {
      throw new Error('required value is not allowed to be null');
    }

    const result = this.categoryModel.create(name);
    return result;
  }

  async setCategory(currentCategoryName, nameToChange) {
    if (currentCategoryName == null || nameToChange == null) {
      throw new Error('required value is not allowed to be null');
    }

    const result = await this.categoryModel.update(
      currentCategoryName,
      nameToChange,
    );
    return result;
  }

  async deleteCategory(name) {
    if (name == null) {
      throw new Error('required value is not allowed to be null');
    }
    const category = await this.getCategoryOne(name);
    if (!category) {
      throw new Error("CategoryName doesn't exist in Category Schema");
    }
    await this.categoryModel.delete(name);
    return await this.productModel.deleteMany(category);
  }
}

const categoryService = new CategoryService(
  categoryModel,
  userModel,
  productModel,
);

export { categoryService };
