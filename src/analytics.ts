import * as $ from 'jquery'

function createAnalytics(): object {
    let counter = 0;
    let isDestroyedsssss: boolean = false;

    const listener = () => counter++;

    $(document).on('click', listener);

    return {
        destroy() {
            $(document).off('click', listener);
            isDestroyedsssss = true;
        },

        getClicks() {
            if (isDestroyedsssss) {
                return `analytics is destroyed total ${counter}`
            }
            return counter
        }
    }
}

window['analytics'] = createAnalytics();
