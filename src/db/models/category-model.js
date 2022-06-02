import { model } from 'mongoose';
import { CategorySchema } from '../schemas/category-schema';

const Category = model('Category', CategorySchema);

export class CategoryModel {
  async findByUserId(userId) {
    const category = await Category.findOne({ _id: userId });
    return category;
  }

  async findByName(name) {
    const category = await Category.findOne({ name: name });
    return category;
  }
  async findAll() {
    const categories = await Category.find({});
    return categories;
  }
  async create(categoryName) {
    const createdNewCategory = new Category({
      name: categoryName,
    });
    await createdNewCategory.save();
    return createdNewCategory;
  }

  async update(currentCategoryName, nameToChange) {
    await Category.findOneAndUpdate(
      { name: currentCategoryName },
      { name: nameToChange },
    );
    return;
  }

  async delete(currentCategoryName) {
    await Category.findOneAndDelete({ name: currentCategoryName });
    return;
  }
}

const categoryModel = new CategoryModel();

export { categoryModel };
