const Things = (sequelize, DataType) => {
  const Thing = sequelize.define(
    "Thing",
    {
      name: { type: DataType.STRING, unique: true, allowNull: false },
      treasure: { type: DataType.BOOLEAN, defaultValue: false },
    },
    { timestamps: false }
  );
  return Thing;
};
module.exports = Things;
