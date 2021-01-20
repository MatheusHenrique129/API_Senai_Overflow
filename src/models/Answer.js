const { Model, DataTypes } = require("sequelize");

class Answer extends Model {
    static init(sequelize) {
        super.init(
            {
                description: DataTypes.STRING,
                student_id: DataTypes.INTEGER
            },
            {
                sequelize,
            }
        )
    }

    static associate(models) {
        this.belongsTo(models.Question);
        this.belongsTo(models.Student);
    }
}

module.exports = Answer;