from odoo import fields, models


class ProductProduct(models.Model):
    _inherit = "product.product"

    def _search(self, domain, offset=0, limit=None, order=None, access_rights_uid=None):
        """ Override _search in order to grep search on product_alias_string field """
        if domain:
            name = ''
            for arg in domain:
                if isinstance(arg, (list, tuple)) and arg[0] == 'default_code' and isinstance(arg[2], str):
                    name = arg[2]
                    break
            if name:
                domain = ['|', ('product_alias_string', 'ilike', name)] + domain
        return super()._search(domain, offset=offset, limit=limit, order=order, access_rights_uid=access_rights_uid)
