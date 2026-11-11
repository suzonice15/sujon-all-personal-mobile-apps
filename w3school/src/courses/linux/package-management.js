// Linux chapter: Package Management.

export default {
  id: 'package-management',
  title: 'Package Management',
  description: 'Install, update and remove software safely',
  icon: 'inventory-2',
  lessons: [
    {
      id: 'linux-apt',
      title: 'apt (Debian / Ubuntu)',
      blocks: [
        { type: 'text', value: 'apt installs, updates and removes packages on Debian and Ubuntu. Always refresh the package index before installing.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `sudo apt update
sudo apt install nginx
sudo apt upgrade
sudo apt remove nginx
apt search nginx
apt show nginx` },
        { type: 'note', value: 'apt update refreshes the list of available packages. apt upgrade installs newer versions of what is already installed.' },
      ],
    },
    {
      id: 'linux-dnf-brew',
      title: 'dnf and Homebrew',
      blocks: [
        { type: 'text', value: 'Fedora and RHEL use dnf. macOS uses Homebrew. The concepts are the same: update the index, install, upgrade and remove.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `# Fedora
sudo dnf install nginx
sudo dnf upgrade

# macOS
brew update
brew install node
brew upgrade
brew list` },
      ],
    },
    {
      id: 'linux-repos',
      title: 'Repositories and trust',
      blocks: [
        { type: 'text', value: 'A package comes from a repository. The system verifies signatures so a mirror cannot silently replace a package. Adding an untrusted repository weakens that guarantee.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `apt policy nginx
cat /etc/apt/sources.list
ls /etc/apt/sources.list.d/

# Debian package file
sudo dpkg -i package.deb
sudo apt -f install` },
        { type: 'note', value: 'Prefer the official repository. A random .deb or install script from the internet can run anything as root.' },
      ],
    },
    {
      id: 'linux-versions',
      title: 'Versions and alternatives',
      blocks: [
        { type: 'text', value: 'Different projects may need different versions of a runtime. Version managers avoid changing the system package. update-alternatives can switch a system command.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `node --version
which node

# Version managers
nvm install 20
nvm use 20

# System alternatives
sudo update-alternatives --config java` },
        { type: 'note', value: 'Do not install global tools as root when a user-level version manager works. It keeps the system clean and avoids permission problems.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'package-management',
      q: 'What does apt update do?',
      options: ['Installs packages', 'Refreshes the package index', 'Upgrades the OS', 'Removes packages'],
      answer: 1,
      explain: 'It downloads the latest package lists from the repositories.',
    },
    {
      chapterId: 'package-management',
      q: 'Which distro family uses dnf?',
      options: ['Debian', 'Fedora / RHEL', 'Arch', 'macOS'],
      answer: 1,
      explain: 'dnf is the Fedora and RHEL package manager.',
    },
    {
      chapterId: 'package-management',
      q: 'Why are repository signatures important?',
      options: ['They make installs faster', 'They verify the package is authentic', 'They compress files', 'They choose a version'],
      answer: 1,
      explain: 'Signatures prevent a mirror from serving a tampered package.',
    },
    {
      chapterId: 'package-management',
      q: 'What does nvm manage?',
      options: ['Node versions', 'Nginx config', 'System users', 'Disk partitions'],
      answer: 0,
      explain: 'Node Version Manager switches Node versions per project.',
    },
  ],
};
