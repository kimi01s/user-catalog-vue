/* __placeholder__ */
export default (await import('vue')).defineComponent({
data: () => ({
firstName: '',
nameRules: [
name => {
if (name) return true;

return 'You must enter a first name.';
},
],
}),
});
