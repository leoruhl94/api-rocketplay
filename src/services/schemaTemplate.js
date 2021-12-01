const { DataTypes, Sequelize } = require("sequelize")
const {conn} = require('../libs/sequelize');

const sequelize = conn


module.exports = async function createTemplate(name) {
    const User = sequelize.define('user', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        mail: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        usertype: {
            type: DataTypes.ENUM('subscriber', 'admin', 'superadmin'),
            allowNull: false
        }
    }, {
            sequelize,
            modelName: 'user',
            schema: name.toLowerCase(),
            tableName: 'users',
            timestamps: false, //we do not need updatedAt nor createdAt
            
            
        });
    
    const Channel = sequelize.define('channel', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isprivate: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT
        }

    }, {
        sequelize,
        modelName: 'channel',
        schema: name.toLowerCase(),
        tableName: 'channels',
        timestamps: false, //we do not need updatedAt nor createdAt
    })

    const Category = sequelize.define('category', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    }, {
        sequelize,
        modelName: 'category',
        schema: name.toLowerCase(),
        tableName: 'categories',
        timestamps: false, //we do not need updatedAt nor createdAt
    })

    const Video = sequelize.define('video', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT
        },
        isShort: {
            type: DataTypes.BOOLEAN
        }

    }, {
        sequelize,
        modelName: 'video',
        schema: name.toLowerCase(),
        tableName: 'videos',
        timestamps: false, //we do not need updatedAt nor createdAt
    })

    const Tag = sequelize.define('tag', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    }, {
        sequelize,
        modelName: 'tag',
        schema: name.toLowerCase(),
        tableName: 'tags',
        timestamps: false, //we do not need updatedAt nor createdAt
    })


    User.belongsToMany(Channel, { through: "userchannels" })
    Channel.belongsToMany(User, { through: "userchannels" })

    Category.belongsToMany(Channel, { through: "channelscategory" })
    Channel.belongsToMany(Category, { through: "channelscategory" })

    Category.belongsToMany(Video, { through: "videocategory" })
    Video.belongsToMany(Category, { through: "videocategory" })

    Tag.belongsToMany(Video, { through: "videotags" })
    Video.belongsToMany(Tag, { through: "videotags" })

    User.hasMany(Video)
    Video.belongsTo(User)
    
    await sequelize.sync({schema: name.toLowerCase()}) 

    return User
}