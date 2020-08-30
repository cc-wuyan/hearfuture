const returnBack = function(e) {
    setTimeout(() => {
        e.$router.go(-1);
    }, 200);
}
export default returnBack