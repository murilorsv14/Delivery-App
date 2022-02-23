module.exports = (sequelize, DataTypes) => {
  const SalesProducts = sequelize.define('Sales_Product', {
    quantity: DataTypes.INTEGER,
  },
  {
    timestamps: false,
  });
  SalesProducts.associate = (models) => {
    models.Sale.belongsToMany(models.Product, {
      as: 'sales',
      through: SalesProducts,
      foreignKey: 'sale_id',
      otherKey: 'product_id',
    });
    models.Product.belongsToMany(models.Sale, {
      as: 'products',
      through: SalesProducts,
      foreignKey: 'product_id',
      otherKey: 'sale_id',
    });
  };

  return SalesProducts;
};