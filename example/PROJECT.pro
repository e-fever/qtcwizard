QT       += testlib qml qmltest

TARGET = PROJECT
CONFIG   += console
CONFIG   -= app_bundle
CONFIG += warn_on qmltestcase

TEMPLATE = app

QML_IMPORT_PATH += $$PWD

!win32 {
    QMAKE_CXXFLAGS += -Werror
}

SOURCES += \
    main.cpp

DEFINES += SRCDIR=\\\"$$PWD/\\\"
DEFINES += TEST_SOURCE_DIR=\\\"$$PWD\\\"

DISTFILES += \
    tst_Sample.qml
