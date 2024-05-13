from django.shortcuts import render, redirect

# Create your views here.

def index(request):
    return render(request, 'index.html')

# def process_form(request):
#     if request.method == 'POST':
#         # input_text = request.POST.get('input_text')
#         # 这里可以对表单数据进行处理，比如保存到数据库或进行其他操作
#         # 在这个示例中，我们只是简单地将输入文本传递给 index.html 页面
#         return render(request, 'index.html')
#     else:
#         return redirect('start')  # 如果不是 POST 请求，重定向回 start 页面