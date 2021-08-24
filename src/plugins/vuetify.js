import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
            primary: colors.teal.lighten1, //80CBC4
            secondary: colors.grey.lighten1, // #BDBDBD
            accent: colors.teal.lighten5, // #E0F2F1
            },
        },
        },
});
