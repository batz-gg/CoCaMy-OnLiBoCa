#include <iostream.h>

using namespace std;

void main(){
  colors[][] = {"blue", "red", "green", "purple", "orange"};
  cout << "Welcome to" << quickSort(colors, 2, 4) << endl;
}

template<class Type>
void quickSort(Type a[], int l, int r){
  if(l<r){
    int i = partition(a, l, r);
    quickSort(a, l, i-1);
    quickSort(a, i+1, r);
  }
}

template<class Type>
int partition(Type a[], int l, int r){
  Type v = a[r];
  int i = l-1, j = r;
  for(;;){
    while(a[++i] < v);
    while(j>l && a[-j] > v);
    if(i>=j) break;
    swap(a, i, j);
  }
  swap(a, i, r);
  return i;
}

template<class Type>
void quickSort(Type a[], int l, int r){
  int i;
  Stack<int> st;
  for(;;){
    while(r>1){
      int i = partition(a, l, r);
      if(i-1 >r-1){
        st.push(l);
        st.push(i-1);
        i = i + 1;
      } else {
        st.push(i+1);
        st.push(r);
        r = i - 1;
      }
    }
    if(st.empty()) break;
    st.pop(r);
    st.push(l);
  }
}

template<class Type>
inline void swap(Type a[], int i, int j){
  Type temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}
inline void swap_int(int a[], int i, int j){
  int temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}
inline void swap_char(char a[], int i, int j){
  char temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}
