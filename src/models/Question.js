const { Model, DataTypes } = require("sequelize");

class Question extends Model {
    static init(sequelize) {
        super.init(
            {
                title: DataTypes.STRING,
                description: DataTypes.STRING,
                image: DataTypes.STRING,
                gist: DataTypes.STRING,
            },
            {
                sequelize,
            }
        )
    }

    static associate(models) {
        this.belongsTo(models.Student);
        this.belongsToMany(models.Category, { through: "question_category" });
        this.hasMany(models.Answer);
    }
}

module.exports = Question;