import { DataTypes } from "sequelize"
const {conn} = require('../libs/sequelize');

const sequelize = conn

export default function createTemplate(name: string) {
    const User = sequelize.define('User', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        userType: {
            type: DataTypes.ENUM('subscriber', 'admin', 'superadmin'),
            allowNull: false
        }
    }, {
            schema: name,
        });
    
    const Channel = sequelize.define('Channel', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isPrivate: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT
        }

    }, {
        schema: name
    })

    const Category = sequelize.define('Category', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    }, {
        schema: name
    })

    const Video = sequelize.define('Video', {
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
        schema: name
    })

    const Tag = sequelize.define('Tag', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    }, {
        schema: name
    })

    User.belongsToMany(Channel, { through: "UserChannels" })
    Channel.belongsToMany(User, { through: "UserChannels" })

    Category.belongsToMany(Channel, { through: "ChannelsCategory" })
    Channel.belongsToMany(Category, { through: "ChannelsCategory" })

    Category.belongsToMany(Video, { through: "VideoCategory" })
    Video.belongsToMany(Category, { through: "VideoCategory" })

    Tag.belongsToMany(Video, { through: "VideoTags" })
    Video.belongsToMany(Tag, { through: "VideoTags" })

    User.hasMany(Video)
    Video.belongsTo(User)

}