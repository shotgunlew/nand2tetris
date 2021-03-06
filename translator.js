fs=require('fs');
var asm = [];
var buffer;
var output;
var count = 0;
var FRAME = "R7";
var RET = "R8";
var curFileName;

var commands = {"add":"C_ARITHMETIC",
                "sub":"C_ARITHMETIC",
                "neg":"C_ARITHMETIC",
                "eq":"C_ARITHMETIC",
                "gt":"C_ARITHMETIC",
                "lt":"C_ARITHMETIC",
                "and":"C_ARITHMETIC",
                "or":"C_ARITHMETIC",
                "not":"C_ARITHMETIC",
                "push":"C_PUSH",
                "pop":"C_POP",
                "label":"C_LABEL",
                "goto":"C_GOTO",
                "if-goto":"C_IF",
                "function":"C_FUNCTION",
                "return":"C_RETURN",
                "call":"C_CALL"
                };

function isComment(command) {
    if ((command[0] == "/") && (command[1] == "/")) {
        return true;
    };
};

function isWhiteSpace(command) {
    if (command.length == 0) {
        return true;
    };
};

function commandType(cmd) {
    return commands[cmd]; 
};

function arg1(cmd) {
    if (commandType(cmd[0]) == "C_ARITHMETIC") {
        return cmd[0];
    } else {
        return cmd[1];
    };
};

function arg2(cmd) {
    if (commandType(cmd[0]) == "C_PUSH" || "C_POP" || "C_FUNCTION" || "C_CALL") {
        return cmd[2];
    };
};

function parse() {
    //strip comments and trim whitespace
    for (var i=0; i<buffer.length; i++) {
        command = buffer[i]
        if (!isComment(command) && !isWhiteSpace(command)) {
            output.push(buffer[i]);
        };
    };
    //split commands into individual keywords
    for (var j=0; j<output.length; j++) {
        output[j] = output[j].split(" ");
    };
};

function write(cmd) {
    asm.push(cmd);
};

function genRandLabel() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWZYXabcdefghijklmnopqrstuvwxyz";
    for (var i=1; i<6; i++) {
        text +=possible.charAt(Math.floor(Math.random() * possible.length));
    };
    return text;
};

function writeArithmetic(cmd) {
    label1 = genRandLabel();
    label2 = genRandLabel();
    switch(arg1(cmd)) {
        case "add":
            getTop2Stack();
            write(["M=M+D"]);
            incrementRegister("SP");
            break;
        case "sub":
            getTop2Stack();
            write(["M=M-D"]);
            incrementRegister("SP");
            break;
        case "neg":
            decrementRegister("SP");
            AtoSP();
            write(["M=-M"]);
            incrementRegister("SP");
            break;
        case "eq":
            getTop2Stack();
            write(["D=D-M"]);
            write(["@"+label1]);
            write(["D;JNE"]);
            write(["@1"]);
            write(["D=-A"]);
            AtoSP();
            write(["M=D"]);
            write(["@"+label2]);
            write(["0;JMP"]);
            write(["("+label1+")"]);
            write(["@0"]);
            write(["D=A"]);
            AtoSP();
            write(["M=D"]);
            write(["("+label2+")"]);
            incrementRegister("SP");
            break;
        case "gt":
            getTop2Stack();
            write(["D=M-D"]);
            write(["@"+label1]);
            write(["D;JLE"]);
            write(["@1"]);
            write(["D=-A"]);
            AtoSP();
            write(["M=D"]);
            write(["@"+label2]);
            write(["0;JMP"]);
            write(["("+label1+")"]);
            write(["@0"]);
            write(["D=A"]);
            AtoSP();
            write(["M=D"]);
            write(["("+label2+")"]);
            incrementRegister("SP");
            break;
        case "lt":
            getTop2Stack();
            write(["D=M-D"]);
            write(["@"+label1]);
            write(["D;JGE"]);
            write(["@1"]);
            write(["D=-A"]);
            AtoSP();
            write(["M=D"]);
            write(["@"+label2]);
            write(["0;JMP"]);
            write(["("+label1+")"]);
            write(["@0"]);
            write(["D=A"]);
            AtoSP();
            write(["M=D"]);
            write(["("+label2+")"]);
            incrementRegister("SP");
            break;
        case "and":
            getTop2Stack();
            write(["M=M&D"]);
            incrementRegister("SP");
            break;
        case "or":
            getTop2Stack();
            write(["M=M|D"]);
            incrementRegister("SP");
            break;
        case "not":
            decrementRegister("SP");
            AtoSP();
            write(["M=!M"]);
            incrementRegister("SP");
            break;
    };
};

function writePushPop(cmdType, register, index) {
   switch (cmdType) {
        case "C_PUSH":
            switch(register) {
                case "constant":
                    write(["@" + index]);
                    write(["D=A"]);   
                    AtoSP();
                    write(["M=D"]);
                    incrementRegister("SP");
                    break;
                case "local":
                    reg2Stack("LCL", index)
                    break;
                case "argument":
                    reg2Stack("ARG", index);
                    break;
                case "this":
                    reg2Stack("THIS", index);
                    break;
                case "that":
                    reg2Stack("THAT", index);
                    break;
                case "temp":
                    temp2Stack(index);
                    break;
                case "pointer":
                    if (index == 0) {
                        write(["@THIS"]);
                        write(["D=M"]);
                        AtoSP();
                        write(["M=D"]);
                        incrementRegister("SP");
                    } else if (index == 1) {
                        write(["@THAT"]);
                        write(["D=M"]);
                        AtoSP();
                        write(["M=D"])
                        incrementRegister("SP");
                    };
                    break;
                case "static":
                    write("@"+curFileName+"."+index);
                    write(["D=M"]);
                    AtoSP();
                    write(["M=D"]);
                    incrementRegister("SP");
                    break;
        };
            break;
        case "C_POP":
            switch(register) {
                case "local":
                    stack2Reg("LCL", index);
                    break;
                case "argument":
                    stack2Reg("ARG", index);
                    break;
                case "this":
                    stack2Reg("THIS", index);
                    break;
                case "that":
                    stack2Reg("THAT", index);
                    break; 
                case "temp":
                    stack2Reg("TEMP", index);
                    break;
                case "pointer":
                    if (index == 0) {
                        decrementRegister("SP");
                        AtoSP();
                        write(["D=M"]);
                        write(["@THIS"]);
                        write(["M=D"]);
                    } else if (index == 1) {
                        decrementRegister("SP");
                        AtoSP();
                        write("D=M")
                        write(["@THAT"]);
                        write("M=D");
                    };
                    break;
                case "static":
                    decrementRegister("SP");
                    AtoSP();
                    write(["D=M"]);
                    write(["@"+curFileName+"."+index]);
                    write(["M=D"]);
                    break;
        };
            break;
    };
};

function writeInit() {
    write(["@256"]);
    write(["D=A"]);
    write(["@SP"]);
    write(["M=D"]);
    writeCall("Sys.init", 0);
};

function writeGoto(label) {
    write(["@"+label]);
    write(["0;JMP"]);
};

function writeIf(label) {
    decrementRegister("SP");
    AtoSP();
    write(["D=M"]);
    write(["@"+label]);
    write(["D;JNE"]);
};

function writeLabel(label) {
    write(["("+label+")"]);
};

function writeFunction(name, locals) {
    writeLabel(name);
    for(var i=0; i<locals; i++) {
        AtoSP();
        write(["M=0"]);
        incrementRegister("SP");
    }
};

function writeCall(functionName, numArgs) {
    var returnLabel = "return."+ functionName + "." + count;
    count++;
    //push label
    write(["@"+returnLabel]);
    write(["D=A"]);
    AtoSP();
    write(["M=D"]);
    incrementRegister("SP");
    //save states
    saveState("LCL");
    saveState("ARG");
    saveState("THIS");
    saveState("THAT");
    //new value for ARG
    write(["@SP"]);
    write(["D=M"]);
    write(["@5"]);
    write(["D=D-A"]);
    write(["@"+numArgs]);
    write(["D=D-A"]);
    write(["@ARG"]);
    write(["M=D"]);
    //LCL=SP
    write(["@SP"]);
    write(["D=M"]);
    write(["@LCL"]);
    write(["M=D"]);
    writeGoto(functionName);
    writeLabel(returnLabel);
};

function writeReturn() {
    //FRAME = LCL
    write(["@LCL"]);
    write(["D=M"]);
    write(["@"+FRAME]);
    write(["M=D"]);
    //RET = *(FRAME-5)
    write(["@"+FRAME]);
    write(["D=M"]);
    write(["@5"]);
    write(["D=D-A"]);
    write(["A=D"]);
    write(["D=M"]);
    write(["@"+RET]);
    write(["M=D"]);
    //*ARG = pop()
    decrementRegister("SP");
    AtoSP();
    write(["D=M"]);
    write(["@ARG"]);
    write(["A=M"]);
    write(["M=D"]);
    //SP = ARG + 1
    write(["@ARG"]);
    write(["D=M"]);
    write(["@1"]);
    write(["D=D+A"]);
    write(["@SP"]);
    write(["M=D"]);
    //return states
    returnState("THAT", 1);
    returnState("THIS", 2);
    returnState("ARG", 3);
    returnState("LCL", 4);
    //goto RET
    write(["@"+RET]);
    write(["A=M"]);
    write(["0;JMP"]);
}

function saveState(register) {
    write(["@" + register]);
    write(["D=M"]);
    AtoSP();
    write(["M=D"]);
    incrementRegister("SP");
};

function returnState(register, offset) {
    write(["@"+FRAME]);
    write(["D=M"]);
    write(["@"+offset]);
    write(["D=D-A"]);
    write(["A=D"]);
    write(["D=M"]);
    write(["@"+register]);
    write(["M=D"]);

};

function getTop2Stack() {
    decrementRegister("SP");
    AtoSP();
    write(["D=M"]);
    decrementRegister("SP");
    AtoSP();
};

function reg2Stack(register, index) {
    write(["@"+index]);
    write(["D=A"]);
    AtoReg(register);
    write(["A=D+A"]);
    write(["D=M"]);
    AtoSP();
    write(["M=D"]);
    incrementRegister("SP");
}

function stack2Reg(register, index) {
    //get memory address where you need to store the 'pop'
    write(["@"+index]);
    write(["D=A"]);
    if (register == "TEMP") {
        write(["@R5"])
        write(["D=D+A"]);
    } else if (register == "STATIC") {
        write("@R16");
        write(["D=D+A"]);
    } else {
        write("@"+register);
        write(["D=D+M"]);
    };
    //store this in temp
    write(["@R13"]);
    write(["M=D"]);
    decrementRegister("SP");
    AtoSP();
    write(["D=M"]);
    write(["@R13"]);
    write(["A=M"]); 
    write(["M=D"]);
};

function temp2Stack(index) {
    write(["@"+index]);
    write(["D=A"]);
    write("@R5");
    write("A=A+D");
    write("D=M") ;
    AtoSP();
    write(["M=D"]);
    incrementRegister("SP");
};

function decrementRegister(register) {
    write(["@"+register]);
    write(["M=M-1"]);
};

function AtoSP() {
    write(["@SP"]);
    write(["A=M"]);
};

function AtoReg(register) {
    write(["@"+register]);
    write(["A=M"]);
};

function incrementRegister(register) {
    write(["@"+register]);
    write(["M=M+1"]);
};

function genOutFile() {
    asm = asm.join("\n");
    name = process.argv[2].split('/');
    fd = fs.openSync(name[0] + '/' + name[1] + '/' + name[2] + '/' + name[2] + ".asm", "w");
    fs.write(fd, asm);
};

function main() {
    writeInit();
    var i=2;
    while(process.argv[i]) {
        var path = process.argv[i];
        curFileName = path.split('/')[3];
        console.log(curFileName);
        var data = fs.readFileSync(path, "ascii");
        buffer = data.split(/\n/);
        output = [];
        parse();
        for (var k=0; k<output.length; k++) {
            command = output[k];
            var cmdType = commandType(command[0]);
            if (cmdType == "C_ARITHMETIC") {
                writeArithmetic(command);
            } else if ((cmdType == "C_POP") || (cmdType == "C_PUSH")) {
                writePushPop(cmdType, arg1(command), arg2(command));
            } else if (cmdType == "C_GOTO") {
                writeGoto(arg1(command));
            } else if (cmdType == "C_IF") {
                writeIf(arg1(command));
            } else if (cmdType == "C_LABEL") {
                writeLabel(arg1(command));
            }  else if (cmdType == "C_FUNCTION") {
                writeFunction(arg1(command), arg2(command));
            } else if (cmdType == "C_CALL") {
                writeCall(arg1(command), arg2(command));
            } else if (cmdType == "C_RETURN") {
                writeReturn();
            }
        };
        i++;
    };  
    genOutFile();
};

main();
