#!/bin/bash
set -e

# command line options
while [[ "$#" -gt 0 ]]; do
  case $1 in
    --pkg-name)
      PKG_NAME="$2"
      shift 2
      ;;
    --pkg-version)
      PKG_VERSION="$2"
      shift 2
      ;;
    --arch)
      ARCH="$2"
      shift 2
      ;;
    --build-dir)
      BUILD_DIR="$2"
      shift 2
      ;;
    *)
      usage
      ;;
  esac
done

# Initial params
PKG_NAME="${PKG_NAME:-tinymonitor}"
PKG_VERSION="${PKG_VERSION:-1.0.0}"
ARCH="${ARCH:-all}"
BUILD_DIR="${BUILD_DIR:-deb}"
OUT_FILE="${PKG_NAME}_${PKG_VERSION}_${ARCH}.deb"

# Cleanup and creation directories
rm -rf $BUILD_DIR
mkdir -p ${BUILD_DIR}/DEBIAN
mkdir -p ${BUILD_DIR}/usr/local/bin
mkdir -p ${BUILD_DIR}/usr/local/lib/${PKG_NAME}
mkdir -p ${BUILD_DIR}/etc/systemd/system/

# Copy sh scripts
cp monitor/tinymonitor.sh ${BUILD_DIR}/usr/local/bin/${PKG_NAME}
cp -r monitor/lib/. ${BUILD_DIR}/usr/local/lib/${PKG_NAME}/
cp service/tinymonitor.service ${BUILD_DIR}/etc/systemd/system/${PKG_NAME}.service
cp service/tinymonitor.timer ${BUILD_DIR}/etc/systemd/system/${PKG_NAME}.timer

# Creation control file
cat > ${BUILD_DIR}/DEBIAN/control <<EOF
Package: ${PKG_NAME}
Version: ${PKG_VERSION}
Section: utils
Priority: optional
Architecture: ${ARCH}
Maintainer: ihavelapki
Description: tiny monitoring service
Depends: bash (>= 5.0)
EOF

# Rights 
chmod 755 $BUILD_DIR/usr/local/bin/${PKG_NAME}
chmod -R 755 $BUILD_DIR/usr/local/lib/${PKG_NAME}/
chmod 644 ${BUILD_DIR}/etc/systemd/system/${PKG_NAME}.service
chmod 644 ${BUILD_DIR}/etc/systemd/system/${PKG_NAME}.timer
chmod 755 $BUILD_DIR/DEBIAN

# Build .deb package
dpkg-deb --build $BUILD_DIR $OUT_FILE

echo "✔️ pkg created: $OUT_FILE"
