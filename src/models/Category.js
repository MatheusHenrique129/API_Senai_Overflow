const { Model, DataTypes } = require("sequelize");

class Category extends Model {
    /**
     * aqui configuramos os campos da tabela
     * os campos automáticos não precisam ser declarados
     */
    static init(sequelize) {
        super.init(
            {
                description: DataTypes.STRING
            },
            {
                sequelize,
            }
        )
    }

    /**
     * aqui configuramos os relacionamentos 
     */
    static associate(models) {
        this.belongsToMany(models.Question, { through: "question_category" });
    }
}

module.exports = Category;