Template.content.helpers({
    wallpapersList: function () {
        all = Wallpapers.find({}).fetch();
        chunks = [];
        size = 3;
        while (all.length > 3) {
            chunks.push({row: all.slice(0, 3)});
            all = all.slice(3);
        }
        chunks.push({row: all});
        console.log(chunks);
        return chunks;
        
    },
});


