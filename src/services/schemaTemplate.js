const { DataTypes, Sequelize } = require("sequelize")
const {conn} = require('../libs/sequelize');

const sequelize = conn


module.exports = async function createTemplate(name) {
    const Member = sequelize.define('members', {
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
            modelName: 'member',
            schema: name.toLowerCase(),
            tableName: 'members',
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
            allowNull: false,
        },
        link: {
            type: DataTypes.STRING,
            allowNull: false,
            get(){
                return "https://rocketplay2021.s3.us-east-1.amazonaws.com/" + this.getDataValue("link")
            }
        },
        description: {
            type: DataTypes.TEXT
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
        timestamps: true,
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

    }, {
        sequelize,
        modelName: 'like',
        schema: name.toLowerCase(),
        tableName: 'likes',
        timestamps: false, //we do not need updatedAt nor createdAt
    })


    // User.belongsToMany(Channel, { through: "userchannels" })
    // Channel.belongsToMany(User, { through: "userchannels" })

    // Category.belongsToMany(Channel, { through: "channelscategory" })
    // Channel.belongsToMany(Category, { through: "channelscategory" })

    // Category.belongsToMany(Video, { through: "videocategory" })
    // Video.belongsToMany(Category, { through: "videocategory" })

    Tag.belongsToMany(Video, { through: "videotags" })
    Video.belongsToMany(Tag, { through: "videotags" })

    Member.belongsToMany(Video, { through: "like" })
    Video.belongsToMany(Member, { through: "like" })

    Member.hasMany(Video)
    Video.belongsTo(Member)

    Video.hasMany(Comment)
    Comment.belongsTo(Video)

    Member.hasMany(Comment)
    Comment.belongsTo(Member)

    Category.hasMany(Video)
    Video.belongsTo(Category)

    Channel.hasMany(Category)
    Category.belongsTo(Channel)



    
    await sequelize.sync({schema: name.toLowerCase()}) 

    return User
}