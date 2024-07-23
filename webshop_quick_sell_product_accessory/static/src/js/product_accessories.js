/** @odoo-module **/

import publicWidget from "@web/legacy/js/public/public_widget";
import wSaleUtils from "@website_sale/js/website_sale_utils";

publicWidget.registry.ProductAccessoriesSelector = publicWidget.Widget.extend({
    selector: '.product-accessories-selector',
    read_events: {
        'click .product_add_suggested_product': '_onClickAddSuggestedProduct',
    },
    init() {
        this._super(...arguments);
        this.rpc = this.bindService("rpc");
    },
    _onClickAddSuggestedProduct: function (ev) {
        var self = this;
        var $main_product = $("input[name='product_id']")[0];
        var $product = $(ev.currentTarget).closest('.suggested_product');
        self.rpc("/shop/cart/get_order_details").then(function (order) {
            // Add the main product to the cart if it isn't there yet
            if (!order['product_ids'].includes(parseInt($main_product.value))) {
                self.rpc("/shop/cart/update_json", {
                    product_id:parseInt($main_product.value),
                    add_qty: 1,
                }).then((data) => {
                    // Update cart in navbar so that the number of products is updated
                    wSaleUtils.updateCartNavBar(data);
                    wSaleUtils.showWarning(data.notification_info.warning);
                    self._addAccessoryToCart(self, $product)
                });
            } else {
                self._addAccessoryToCart(self, $product)
            }
        });
    },
    _addAccessoryToCart: function (self, $product) {
        // Add the product to the cart
        self.rpc("/shop/cart/update_json", {
            product_id: $product.find('input[data-product-id]').data('product-id'),
            add_qty: 1,
        }).then((data) => {
            // Remove product from suggested products because it was already added to the cart
            $product.remove();
            
            // Update total suggestions, if zero, remove the suggestions part
            var total_element = $('span[id="total_suggested_products"]');
            var total = parseInt(total_element[0].textContent) - 1;
            total_element.text(total);
            if (total === 0) {
                $('.product-accessories-selector').remove();
            }
            // Update cart in navbar so that the number of products is updated
            wSaleUtils.updateCartNavBar(data);
            wSaleUtils.showWarning(data.notification_info.warning);
        });
    },
});

export default publicWidget.registry.ProductAccessoriesSelector;
