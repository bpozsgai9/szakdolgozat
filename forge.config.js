module.exports = {
  packagerConfig: {
    icon: 'src/pic/osa'
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        iconUrl: 'src/pic/osa.ico',
        setupIcon: 'src/pic/osa.ico'
      },
      
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
      icon: 'src/pic/osa.ico'
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
};
