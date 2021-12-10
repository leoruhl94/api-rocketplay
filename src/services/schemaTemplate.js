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
            allowNull: false,
            defaultValue: 'subscriber'
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
        },
    }, {
        sequelize,
        modelName: 'category',
        schema: name.toLowerCase(),
        tableName: 'categories',
        timestamps: false, //we do not need updatedAt nor createdAt
    })

    const Video = sequelize.define('video', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT
        },
        link: {
            type: DataTypes.STRING
        },
        externalid: {
            type: DataTypes.STRING
        },
        channelname: {
            type: DataTypes.STRING
        },
        channelavatar: {
            type: DataTypes.STRING
        },
        thumbnail: {
            type: DataTypes.STRING
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

    const Comment = sequelize.define('comment', {
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'comment',
        schema: name.toLowerCase(),
        tableName: 'comments'
    })

    const Like = sequelize.define('like', {
        like: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'like',
        schema: name.toLowerCase(),
        tableName: 'likes'
    })


    // User.belongsToMany(Channel, { through: "userchannels" })
    // Channel.belongsToMany(User, { through: "userchannels" })

    // Category.belongsToMany(Channel, { through: "channelscategory" })
    // Channel.belongsToMany(Category, { through: "channelscategory" })

    // Category.belongsToMany(Video, { through: "videocategory" })
    // Video.belongsToMany(Category, { through: "videocategory" })

    Tag.belongsToMany(Video, { through: "videotags" })
    Video.belongsToMany(Tag, { through: "videotags" })

    User.belongsToMany(Video, { through: "like" })
    Video.belongsToMany(User, { through: "like" })

    User.hasMany(Video)
    Video.belongsTo(User)

    Video.hasMany(Comment)
    Comment.belongsTo(Video)

    User.hasMany(Comment)
    Comment.belongsTo(User)

    Category.hasMany(Video)
    Video.belongsTo(Category)

    Channel.hasMany(Category)
    Category.belongsTo(Channel)



    
    await sequelize.sync({schema: name.toLowerCase()}) 

    return User
}