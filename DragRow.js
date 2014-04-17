/**
 * Created by liangzhimin on 2014/4/15.
 */
(function($){

    $.fn.dragrow = function() {
        var that = this;
        var $window = $(window);

        that.on('mousedown', dragStart);

        function dragStart(e) {
            e =e||event;
            var target = e.target|| e.srcElement;

            if (target.nodeName == "TD") {
                target =$(target).parent();

                that.dragobj = target;
                target.css({
                    "background-color": "#cccccc",
                    "cursor": "move"

                });

                that.clientY = e.clientY;
                $window.on('mousemove', dragging);
                $window.on('mouseup', draggEnd);
            }
        }

        function dragging(e) {
            var dragobj = that.dragobj;
            if (dragobj) {
                e = e||event;
                //取消选中的内容
                window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
                var y = e.clientY;
                var down = y > that.clientY;
                var tr = document.elementFromPoint(e.clientX, e.clientY);//从坐标点中找元素
                if (tr && tr.nodeName == "TD") {
                    tr = $(tr).parent();
                    that.clientY = y;
                    if (dragobj !== tr) {
                       // tr.parent().insertBefore(dragobj, (down ? tr.nextSibling : tr));
                        var refernode = down ? tr.next() : tr;
                        refernode.before(dragobj);
                    }
                }
            }
        }

        function draggEnd(e) {
            var dragobj = that.dragobj;
            if (dragobj) {
                e = e || event;
                var target = e.target || e.srcElement;
                if (target.nodeName == "TD") {
                    target = $(target).parent();
                    dragobj.css({"background-color": "",
                        "cursor": "default"});


                    that.dragobj = null;
                    $window.off("mousemove", dragging);
                    $window.off("mouseup", draggEnd);
                }
            }
        }

        return that;
    }


})(jQuery);