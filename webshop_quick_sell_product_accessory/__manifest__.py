# -*- coding: utf-8 -*-
{
    'name': 'Website Sale Product Accessory',
    'category': 'Website',
    'version': '17.0.1.0.0',
    'author': 'Mainframe Monkey',
    'website': 'https://www.mainframemonkey.com',
    'summary': 'Website Quick Sell Product accessories',
    'description': """Website Quick Sell Product accessories""",
    'depends': [
        'sale_product_configurator',
        'website_sale',
    ],
    'data': [
        'views/optional_product_view.xml',
    ],
    'assets': {
        'web.assets_frontend': [
            'webshop_quick_sell_product_accessory/static/src/**/*',
        ],
    },
    'license': 'LGPL-3',
}

