class Renderer {
    // canvas:              object ({id: __, width: __, height: __})
    // num_curve_sections:  int
    constructor(canvas, num_curve_sections, show_points_flag) {
        this.canvas = document.getElementById(canvas.id);
        this.canvas.width = canvas.width;
        this.canvas.height = canvas.height;
        this.ctx = this.canvas.getContext('2d', {willReadFrequently: true});
        this.slide_idx = 0;
        this.num_curve_sections = num_curve_sections;
        this.show_points = show_points_flag;
    }

    // n:  int
    setNumCurveSections(n) {
        this.num_curve_sections = n;
        this.drawSlide(this.slide_idx);
    }

    // flag:  bool
    showPoints(flag) {
        this.show_points = flag;
        this.drawSlide(this.slide_idx);
    }
    
    // slide_idx:  int
    drawSlide(slide_idx) {
        this.slide_idx = slide_idx;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        let framebuffer = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);

        switch (this.slide_idx) {
            case 0:
                this.drawSlide0(framebuffer);
                break;
            case 1:
                this.drawSlide1(framebuffer);
                break;
            case 2:
                this.drawSlide2(framebuffer);
                break;
            case 3:
                this.drawSlide3(framebuffer);
                break;
        }

        this.ctx.putImageData(framebuffer, 0, 0);
    }

    // framebuffer:  canvas ctx image data
    drawSlide0(framebuffer) {
        // TODO: draw at least 2 Bezier curves
        //   - variable `this.num_curve_sections` should be used for `num_edges`
        //   - variable `this.show_points` should be used to determine whether or not to render vertices


        // CREATE FIRST BEZIER CURVE
        // We need to set the four points for the first curve
        let p_0_0 = {x: 20, y:50}; // Start
        let p_0_1 = {x: 200, y:350}; // Control
        let p_0_2 = {x: 350, y:200}; // Control
        let p_0_3 = {x: 400, y:400}; // End

        // CREATE FIRST BEZIER CURVE
        // We need to set the four points for the second curve
        let p_1_0 = {x: 300, y:300}; // Start
        let p_1_1 = {x: 400, y:200}; // Control
        let p_1_2 = {x: 200, y:400}; // Control
        let p_1_3 = {x: 500, y:500}; // End

        let ps_0 = this.drawBezierCurve(p_0_0, p_0_1, p_0_2, p_0_3, this.num_curve_sections, [255, 0, 0, 255], framebuffer);
        let ps_1 = this.drawBezierCurve(p_1_0, p_1_1, p_1_2, p_1_3, this.num_curve_sections, [0, 128, 128, 255], framebuffer);

        if (this.show_points) {
            for (let x = 0; x < ps_0.length-1; x++) {
                this.drawVertex(ps_0[x], [255, 0, 0, 255], framebuffer);
                this.drawVertex(ps_1[x], [0, 128, 128, 255], framebuffer);
            }
        }

    }

    // framebuffer:  canvas ctx image data
    drawSlide1(framebuffer) {
        // TODO: draw at least 2 circles
        //   - variable `this.num_curve_sections` should be used for `num_edges`
        //   - variable `this.show_points` should be used to determine whether or not to render vertices


        let ps_0 = this.drawCircle({x: 100, y: 100}, 75, this.num_curve_sections, [255, 0, 0, 255], framebuffer);
        let ps_1 = this.drawCircle({x: 200, y: 200}, 30, this.num_curve_sections, [0, 128, 128, 255], framebuffer);

        if (this.show_points) {
            for (let x = 0; x < ps_0.length-1; x++) {
                this.drawVertex(ps_0[x], [255, 0, 0, 255], framebuffer);
                this.drawVertex(ps_1[x], [0, 128, 128, 255], framebuffer);
            }
        }
        
    }

    // framebuffer:  canvas ctx image data
    drawSlide2(framebuffer) {
        // TODO: draw at least 2 convex polygons (each with a different number of vertices >= 5)
        //   - variable `this.show_points` should be used to determine whether or not to render vertices

        let base_point_0 = {x: 320, y: 160};
        let p_0_0 = {x: 340, y: 200};
        let p_0_1 = {x: 320, y: 300};
        let p_0_2 = {x: 300, y: 310};
        let p_0_3 = {x: 270, y: 300};
        let p_0_4 = {x: 250, y: 260};
        let p_0_5 = {x: 230, y: 220};

        this.drawTriangle(base_point_0, p_0_0, p_0_1, [0, 128, 128, 255], framebuffer);
        this.drawTriangle(base_point_0, p_0_1, p_0_2, [0, 128, 128, 255], framebuffer);
        this.drawTriangle(base_point_0, p_0_2, p_0_3, [0, 128, 128, 255], framebuffer);
        this.drawTriangle(base_point_0, p_0_3, p_0_4, [0, 128, 128, 255], framebuffer);
        this.drawTriangle(base_point_0, p_0_4, p_0_5, [0, 128, 128, 255], framebuffer);

        let base_point_1 = {x: 500, y: 300};
        let p_1_0 = {x: 450, y: 350};
        let p_1_1 = {x: 470, y: 280};
        let p_1_2 = {x: 430, y: 280};
        let p_1_3 = {x: 390, y: 370};
        let p_1_4 = {x: 350, y: 340};
        let p_1_5 = {x: 330, y: 400};

        this.drawTriangle(base_point_1, p_1_0, p_1_1, [0, 0, 128, 255], framebuffer);
        this.drawTriangle(base_point_1, p_1_1, p_1_2, [0, 0, 128, 255], framebuffer);
        this.drawTriangle(base_point_1, p_1_2, p_1_3, [0, 0, 128, 255], framebuffer);
        this.drawTriangle(base_point_1, p_1_3, p_1_4, [0, 0, 128, 255], framebuffer);
        this.drawTriangle(base_point_1, p_1_4, p_1_5, [0, 0, 128, 255], framebuffer);

        let point_memory = [base_point_0, p_0_0, p_0_1, p_0_2, p_0_3, p_0_4, p_0_5,
        base_point_1, p_1_0, p_1_1, p_1_2, p_1_3, p_1_4, p_1_5];



    }

    // framebuffer:  canvas ctx image data
    drawSlide3(framebuffer) {
        // TODO: draw your name!
        //   - variable `this.num_curve_sections` should be used for `num_edges`
        //   - variable `this.show_points` should be used to determine whether or not to render vertices
        
        
    }

    // p0:           object {x: __, y: __}
    // p1:           object {x: __, y: __}
    // p2:           object {x: __, y: __}
    // p3:           object {x: __, y: __}
    // num_edges:    int
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawBezierCurve(p0, p1, p2, p3, num_edges, color, framebuffer) {
        // TODO: draw a sequence of straight lines to approximate a Bezier curve

        let stepper = 1.0 / num_edges; // Steppies
        let point_memory = []; // Storgae faciloty for teh points

        for (let t = 0.0; t <= 1.0; t+=stepper) {

            // Creates point on the belzier curve
            point_memory.push(
            {x: Math.ceil((Math.pow(1 - t, 3) * p0.x) + (3 * t * p1.x * Math.pow(1 - t, 2)) + (3 * (1 - t) * p2.x * Math.pow(t, 2)) + (Math.pow(t, 3) * p3.x)),
             y: Math.ceil((Math.pow(1 - t, 3) * p0.y) + (3 * t * p1.y * Math.pow(1 - t, 2)) + (3 * (1 - t) * p2.y * Math.pow(t, 2)) + (Math.pow(t, 3) * p3.y))});

        }
        point_memory.push(p3); // Can't forget about p3 - neva neva neva

        // Now we need to draw the belzier curve
        this.drawVector(point_memory, color, framebuffer);


        return point_memory;
        
    }

    // center:       object {x: __, y: __}
    // radius:       int
    // num_edges:    int
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawCircle(center, radius, num_edges, color, framebuffer) {
        // TODO: draw a sequence of straight lines to approximate a circle

        // We need to use the formula for finding the line of a circle (just line)
        let point_memory = [];
        let stepper = 2 * Math.PI / num_edges; // Math.PI NOT Math.Pi

        for (let x = 0; x <= num_edges; x++) { // <= to ensure to get LAST point
            point_memory.push(
            {x: (Math.ceil(center.x + radius * Math.cos(x * stepper))), // center.x that THANG to the right
            y: (Math.ceil(center.y + radius * Math.sin(x * stepper)))}); // center.y that THANG to the UP
        }


        // Same as belzier curve
        this.drawVector(point_memory, color, framebuffer);

        return point_memory;
        
    }

    drawVector(point_memory, color, framebuffer) {
        for (let x = 0; x < point_memory.length-1; x++) {
            this.drawLine(point_memory[x], point_memory[x+1], color, framebuffer);
        }
    }
    
    // vertex_list:  array of object [{x: __, y: __}, {x: __, y: __}, ..., {x: __, y: __}]
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawConvexPolygon(vertex_list, color, framebuffer) {
        // TODO: draw a sequence of triangles to form a convex polygon
        
        
    }
    
    // v:            object {x: __, y: __}
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawVertex(v, color, framebuffer) {
        // TODO: draw some symbol (e.g. small rectangle, two lines forming an X, ...) centered at position `v`

        // S0, considering a X is better than a triangel (everyone knows) I will use an X

        let p0 = {x: v.x - 3, y: v.y + 3};
        let p1 = {x: v.x + 3, y: v.y - 3};
        let p2 = {x: v.x - 3, y: v.y - 3};
        let p3 = {x: v.x + 3, y: v.y + 3};

        this.drawLine(p0, p1, color, framebuffer);
        this.drawLine(p3, p2, color, framebuffer);

    }
    
    /***************************************************************
     ***       Basic Line and Triangle Drawing Routines          ***
     ***       (code provided from in-class activities)          ***
     ***************************************************************/
    pixelIndex(x, y, framebuffer) {
	    return 4 * y * framebuffer.width + 4 * x;
    }
    
    setFramebufferColor(framebuffer, px, color) {
	    framebuffer.data[px + 0] = color[0];
	    framebuffer.data[px + 1] = color[1];
	    framebuffer.data[px + 2] = color[2];
	    framebuffer.data[px + 3] = color[3];
    }
    
    swapPoints(a, b) {
        let tmp = {x: a.x, y: a.y};
        a.x = b.x;
        a.y = b.y;
        b.x = tmp.x;
        b.y = tmp.y;
    }

    drawLine(p0, p1, color, framebuffer) {
        if (Math.abs(p1.y - p0.y) <= Math.abs(p1.x - p0.x)) { // |m| <= 1
            if (p0.x < p1.x) {
                this.drawLineLow(p0.x, p0.y, p1.x, p1.y, color, framebuffer);
            }
            else {
                this.drawLineLow(p1.x, p1.y, p0.x, p0.y, color, framebuffer);
            }
        }
        else {                                        // |m| > 1
            if (p0.y < p1.y) {
                this.drawLineHigh(p0.x, p0.y, p1.x, p1.y, color, framebuffer);
            }
            else {
                this.drawLineHigh(p1.x, p1.y, p0.x, p0.y, color, framebuffer);
            }
        }
    }

    drawLineLow(x0, y0, x1, y1, color, framebuffer) {
        let A = y1 - y0;
        let B = x0 - x1;
        let iy = 1;
        if (A < 0) {
            iy = -1;
            A *= -1;
        }
        let D = 2 * A + B;
        let x = x0;
        let y = y0;
        let px;
        while (x <= x1)
        {
            px = this.pixelIndex(x, y, framebuffer);
            this.setFramebufferColor(framebuffer, px, color);
            x += 1;
            if (D <= 0)
            {
                D += 2 * A;
            }
            else
            {
                D += 2 * A + 2 * B;
                y += iy;
            }
        }
    }

    drawLineHigh(x0, y0, x1, y1, color, framebuffer) {
        let A = x1 - x0;
        let B = y0 - y1;
        let ix = 1;
        if (A < 0) {
            ix = -1;
            A *= -1;
        }
        let D = 2 * A + B;
        let x = x0;
        let y = y0;
        let px;
        while (y <= y1)
        {
            px = this.pixelIndex(x, y, framebuffer);
            this.setFramebufferColor(framebuffer, px, color);
            y += 1;
            if (D <= 0)
            {
                D += 2 * A;
            }
            else
            {
                D += 2 * A + 2 * B;
                x += ix;
            }
        }
    }
    
    drawTriangle(p0, p1, p2, color, framebuffer) {
        // Deep copy input points
        p0 = {x: p0.x, y: p0.y};
        p1 = {x: p1.x, y: p1.y};
        p2 = {x: p2.x, y: p2.y};
        
        // Sort points in ascending y order
        if (p1.y < p0.y) this.swapPoints(p0, p1);
        if (p2.y < p0.y) this.swapPoints(p0, p2);
        if (p2.y < p1.y) this.swapPoints(p1, p2);
        
        // Edge coherence triangle algorithm
        // Create initial edge table
        let edge_table = [
            {x: p0.x, inv_slope: (p1.x - p0.x) / (p1.y - p0.y)}, // edge01
            {x: p0.x, inv_slope: (p2.x - p0.x) / (p2.y - p0.y)}, // edge02
            {x: p1.x, inv_slope: (p2.x - p1.x) / (p2.y - p1.y)}  // edge12
        ];
        
        // Do cross product to determine if pt1 is to the right/left of edge02
        let v01 = {x: p1.x - p0.x, y: p1.y - p0.y};
        let v02 = {x: p2.x - p0.x, y: p2.y - p0.y};
        let p1_right = ((v01.x * v02.y) - (v01.y * v02.x)) >= 0;
        
        // Get the left and right edges from the edge table (lower half of triangle)
        let left_edge, right_edge;
        if (p1_right) {
            left_edge = edge_table[1];
            right_edge = edge_table[0];
        }
        else {
            left_edge = edge_table[0];
            right_edge = edge_table[1];
        }
        // Draw horizontal lines (lower half of triangle)
        for (let y = p0.y; y < p1.y; y++) {
            let left_x = parseInt(left_edge.x) + 1;
            let right_x = parseInt(right_edge.x);
            if (left_x <= right_x) { 
                this.drawLine({x: left_x, y: y}, {x: right_x, y: y}, color, framebuffer);
            }
            left_edge.x += left_edge.inv_slope;
            right_edge.x += right_edge.inv_slope;
        }
        
        // Get the left and right edges from the edge table (upper half of triangle) - note only one edge changes
        if (p1_right) {
            right_edge = edge_table[2];
        }
        else {
            left_edge = edge_table[2];
        }
        // Draw horizontal lines (upper half of triangle)
        for (let y = p1.y; y < p2.y; y++) {
            let left_x = parseInt(left_edge.x) + 1;
            let right_x = parseInt(right_edge.x);
            if (left_x <= right_x) {
                this.drawLine({x: left_x, y: y}, {x: right_x, y: y}, color, framebuffer);
            }
            left_edge.x += left_edge.inv_slope;
            right_edge.x += right_edge.inv_slope;
        }
    }
};
