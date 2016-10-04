"use strict";
var router_1 = require('@angular/router');
var index_1 = require('./layouts/index');
var appRoutes = [
    {
        path: '',
        component: index_1.MainLayout,
    },
];
exports.appRoutingProviders = [];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map