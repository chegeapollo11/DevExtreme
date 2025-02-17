/* eslint-env node */
const path = require('path');
const webpack = require('webpack');

module.exports = {
    output: {
        sourcePrefix: '    ',
        devtoolModuleFilenameTemplate: 'devextreme:///[resource-path]',
        devtoolFallbackModuleFilenameTemplate: 'devextreme:///[resource-path]?[hash]'
    },
    externals: {
        // Optional (calling through window to skip error on script load)
        'jquery': 'window.jQuery',
        'jszip': 'window.JSZip',
        'knockout': 'window.ko',
        'angular': 'window.angular',
        'globalize': 'window.Globalize',
        'globalize/number': 'window.Globalize',
        'globalize/currency': 'window.Globalize',
        'globalize/date': 'window.Globalize',
        'globalize/message': 'window.Globalize',
        'devextreme-quill': 'window.DevExpress.Quill',
        'turndown': 'window.TurndownService',
        'devextreme-showdown': 'window.showdown',
        'exceljs': 'window.ExcelJS',
        'jspdf': 'window.jspdf.jsPDF',
        'devexpress-diagram': 'window.DevExpress.diagram',
        'devexpress-gantt': 'window.DevExpress.Gantt',
        'luxon': 'window.luxon'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ],
    resolve: {
        alias: {
            '@devextreme/vdom': path.resolve('./node_modules/@devextreme/vdom/dist/cjs/index.js'),
        }
    },
};
