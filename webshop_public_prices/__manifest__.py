{
    "name": "Webshop Public Prices",
    "category": "Website/Website",
    "version": "17.0.1.0.0",
    "author": "Mainframe Monkey",
    "website": "https://www.mainframemonkey.com",
    "summary": "Webshop Public Prices",
    "description": """
        Allow configuring to hide or show prices/add to cart for public users
    """,
    "depends": [
        "website",
        "website_sale",
    ],
    "data": [
        "views/res_config_settings_views.xml",
        "views/website_sale_template.xml",
    ],
    "installable": True,
    "license": "LGPL-3",
}
