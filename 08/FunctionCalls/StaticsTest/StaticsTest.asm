@256
D=A
@SP
M=D
@return.Sys.init.0
D=A
@SP
A=M
M=D
@SP
M=M+1
@LCL
D=M
@SP
A=M
M=D
@SP
M=M+1
@ARG
D=M
@SP
A=M
M=D
@SP
M=M+1
@THIS
D=M
@SP
A=M
M=D
@SP
M=M+1
@THAT
D=M
@SP
A=M
M=D
@SP
M=M+1
@SP
D=M
@5
D=D-A
@0
D=D-A
@ARG
M=D
@SP
D=M
@LCL
M=D
@Sys.init
0;JMP
(return.Sys.init.0)
(Sys.init)
@6
D=A
@SP
A=M
M=D
@SP
M=M+1
@8
D=A
@SP
A=M
M=D
@SP
M=M+1
@return.Class1.set.1
D=A
@SP
A=M
M=D
@SP
M=M+1
@LCL
D=M
@SP
A=M
M=D
@SP
M=M+1
@ARG
D=M
@SP
A=M
M=D
@SP
M=M+1
@THIS
D=M
@SP
A=M
M=D
@SP
M=M+1
@THAT
D=M
@SP
A=M
M=D
@SP
M=M+1
@SP
D=M
@5
D=D-A
@2
D=D-A
@ARG
M=D
@SP
D=M
@LCL
M=D
@Class1.set
0;JMP
(return.Class1.set.1)
@0
D=A
@R5
D=D+A
@R13
M=D
@SP
M=M-1
@SP
A=M
D=M
@R13
A=M
M=D
@23
D=A
@SP
A=M
M=D
@SP
M=M+1
@15
D=A
@SP
A=M
M=D
@SP
M=M+1
@return.Class2.set.2
D=A
@SP
A=M
M=D
@SP
M=M+1
@LCL
D=M
@SP
A=M
M=D
@SP
M=M+1
@ARG
D=M
@SP
A=M
M=D
@SP
M=M+1
@THIS
D=M
@SP
A=M
M=D
@SP
M=M+1
@THAT
D=M
@SP
A=M
M=D
@SP
M=M+1
@SP
D=M
@5
D=D-A
@2
D=D-A
@ARG
M=D
@SP
D=M
@LCL
M=D
@Class2.set
0;JMP
(return.Class2.set.2)
@0
D=A
@R5
D=D+A
@R13
M=D
@SP
M=M-1
@SP
A=M
D=M
@R13
A=M
M=D
@return.Class1.get.3
D=A
@SP
A=M
M=D
@SP
M=M+1
@LCL
D=M
@SP
A=M
M=D
@SP
M=M+1
@ARG
D=M
@SP
A=M
M=D
@SP
M=M+1
@THIS
D=M
@SP
A=M
M=D
@SP
M=M+1
@THAT
D=M
@SP
A=M
M=D
@SP
M=M+1
@SP
D=M
@5
D=D-A
@0
D=D-A
@ARG
M=D
@SP
D=M
@LCL
M=D
@Class1.get
0;JMP
(return.Class1.get.3)
@return.Class2.get.4
D=A
@SP
A=M
M=D
@SP
M=M+1
@LCL
D=M
@SP
A=M
M=D
@SP
M=M+1
@ARG
D=M
@SP
A=M
M=D
@SP
M=M+1
@THIS
D=M
@SP
A=M
M=D
@SP
M=M+1
@THAT
D=M
@SP
A=M
M=D
@SP
M=M+1
@SP
D=M
@5
D=D-A
@0
D=D-A
@ARG
M=D
@SP
D=M
@LCL
M=D
@Class2.get
0;JMP
(return.Class2.get.4)
(WHILE)
@WHILE
0;JMP
(Class1.set)
@0
D=A
@ARG
A=M
A=D+A
D=M
@SP
A=M
M=D
@SP
M=M+1
@0
D=A
@R16
D=D+A
@R13
M=D
@SP
M=M-1
@SP
A=M
D=M
@R13
A=M
M=D
@1
D=A
@ARG
A=M
A=D+A
D=M
@SP
A=M
M=D
@SP
M=M+1
@1
D=A
@R16
D=D+A
@R13
M=D
@SP
M=M-1
@SP
A=M
D=M
@R13
A=M
M=D
@0
D=A
@SP
A=M
M=D
@SP
M=M+1
@LCL
D=M
@R7
M=D
@R7
D=M
@5
D=D-A
A=D
D=M
@R8
M=D
@SP
M=M-1
@SP
A=M
D=M
@ARG
A=M
M=D
@ARG
D=M
@1
D=D+A
@SP
M=D
@R7
D=M
@1
D=D-A
A=D
D=M
@THAT
M=D
@R7
D=M
@2
D=D-A
A=D
D=M
@THIS
M=D
@R7
D=M
@3
D=D-A
A=D
D=M
@ARG
M=D
@R7
D=M
@4
D=D-A
A=D
D=M
@LCL
M=D
@R8
A=M
0;JMP
(Class1.get)
@0
D=A
@R16
A=D+A
D=M
@SP
A=M
M=D
@SP
M=M+1
@1
D=A
@R16
A=D+A
D=M
@SP
A=M
M=D
@SP
M=M+1
@SP
M=M-1
@SP
A=M
D=M
@SP
M=M-1
@SP
A=M
M=M-D
@SP
M=M+1
@LCL
D=M
@R7
M=D
@R7
D=M
@5
D=D-A
A=D
D=M
@R8
M=D
@SP
M=M-1
@SP
A=M
D=M
@ARG
A=M
M=D
@ARG
D=M
@1
D=D+A
@SP
M=D
@R7
D=M
@1
D=D-A
A=D
D=M
@THAT
M=D
@R7
D=M
@2
D=D-A
A=D
D=M
@THIS
M=D
@R7
D=M
@3
D=D-A
A=D
D=M
@ARG
M=D
@R7
D=M
@4
D=D-A
A=D
D=M
@LCL
M=D
@R8
A=M
0;JMP
(Class2.set)
@0
D=A
@ARG
A=M
A=D+A
D=M
@SP
A=M
M=D
@SP
M=M+1
@0
D=A
@R16
D=D+A
@R13
M=D
@SP
M=M-1
@SP
A=M
D=M
@R13
A=M
M=D
@1
D=A
@ARG
A=M
A=D+A
D=M
@SP
A=M
M=D
@SP
M=M+1
@1
D=A
@R16
D=D+A
@R13
M=D
@SP
M=M-1
@SP
A=M
D=M
@R13
A=M
M=D
@0
D=A
@SP
A=M
M=D
@SP
M=M+1
@LCL
D=M
@R7
M=D
@R7
D=M
@5
D=D-A
A=D
D=M
@R8
M=D
@SP
M=M-1
@SP
A=M
D=M
@ARG
A=M
M=D
@ARG
D=M
@1
D=D+A
@SP
M=D
@R7
D=M
@1
D=D-A
A=D
D=M
@THAT
M=D
@R7
D=M
@2
D=D-A
A=D
D=M
@THIS
M=D
@R7
D=M
@3
D=D-A
A=D
D=M
@ARG
M=D
@R7
D=M
@4
D=D-A
A=D
D=M
@LCL
M=D
@R8
A=M
0;JMP
(Class2.get)
@0
D=A
@R16
A=D+A
D=M
@SP
A=M
M=D
@SP
M=M+1
@1
D=A
@R16
A=D+A
D=M
@SP
A=M
M=D
@SP
M=M+1
@SP
M=M-1
@SP
A=M
D=M
@SP
M=M-1
@SP
A=M
M=M-D
@SP
M=M+1
@LCL
D=M
@R7
M=D
@R7
D=M
@5
D=D-A
A=D
D=M
@R8
M=D
@SP
M=M-1
@SP
A=M
D=M
@ARG
A=M
M=D
@ARG
D=M
@1
D=D+A
@SP
M=D
@R7
D=M
@1
D=D-A
A=D
D=M
@THAT
M=D
@R7
D=M
@2
D=D-A
A=D
D=M
@THIS
M=D
@R7
D=M
@3
D=D-A
A=D
D=M
@ARG
M=D
@R7
D=M
@4
D=D-A
A=D
D=M
@LCL
M=D
@R8
A=M
0;JMP